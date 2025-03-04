from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)  # This will add the necessary headers to allow cross-origin requests

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://my_user:my_password@localhost/my_database'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your mother'

db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON in request'}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def userDetails():
    currentUserId = get_jwt_identity()
    user = User.query.get(currentUserId)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(username=user.username), 200

@jwt.invalid_token_loader
def invalid_token_callback(error_string):
    return jsonify({'error': 'Invalid token', 'message': error_string}), 422

@jwt.unauthorized_loader
def missing_token_callback(error_string):
    return jsonify({'error': 'Missing token', 'message': error_string}), 422

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
