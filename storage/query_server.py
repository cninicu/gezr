import flask
from flask import request
from flask_cors import CORS

from storage import Storage

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Home Bois</h1>'''

@app.route('/sparql', methods=['GET'])
def query_json():
    if not 'query' in request.args:
        return "Error: No query field."
    return Storage.query(request.args['query'])


Storage.load_graph()
print("Query server running at http://127.0.0.1:5000/ ")
CORS(app)
app.run()



if __name__ == '__main__':
    Storage.__populate()
