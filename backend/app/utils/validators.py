import re

def is_valid_email(email):
    """
    Comprueba si el email tiene un formato válido.
    """
    if not email:
        return False
        
    email_pattern = r'^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
    return bool(re.match(email_pattern, email))

def is_valid_password(password):
    """
    Comprueba si la contraseña tiene min 6 chars, una mayúscula, una minúscula y un número.
    """
    if not password or len(password) < 6:
        return False
        
    password_pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$'
    return bool(re.match(password_pattern, password))