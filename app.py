from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/v1/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "active",
        "system": "Grant Calculator API",
        "week": 1
    }), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MAJOR_THRESHOLDS = {
    'Информационные технологии': 115,
    'Компьютерная инженерия': 110,
    'Software Engineering': 120,
    'Кибербезопасность': 118
}

@app.route('/api/calculate-grant', methods=['POST'])
def calculate_grant():
    data = request.get_json() or {}
    scores = data.get('scores', {})
    major = data.get('major', '')

    try:
        total_score = sum(int(val) for val in scores.values() if val != '')
    except ValueError:
        return jsonify({'error': 'Некорректный формат баллов'}), 400

    threshold = MAJOR_THRESHOLDS.get(major, 100)
    is_eligible = total_score >= threshold
    chance_percentage = min(100, int((total_score / threshold) * 100)) if threshold > 0 else 0

    return jsonify({
        'totalScore': total_score,
        'threshold': threshold,
        'isEligible': is_eligible,
        'chancePercentage': chance_percentage,
        'message': 'Расчет успешно выполнен'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)