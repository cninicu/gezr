import rdflib
import random

graph=rdflib.Graph()
address="http://localhost:8000/schema/"
gezr_namespace=rdflib.Namespace(address)


def initialize_schema():
    schema='@prefix gezr: <'+address+'''> .
@prefix xsd:  <http://www.w3.org/2001/XMLSchema> .
@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
gezr:palm a rdfs:Class;
    gezr:x xsd:integer;
    gezr:y xsd:integer;
    gezr:r xsd:integer.
gezr:skinColor a rdfs:Class;
    gezr:r xsd:integer;
    gezr:g xsd:integer;
    gezr:b xsd:integer.
gezr:fingers a rdfs:Class;
    gezr:amount xsd:integer.
gezr:gesture a rdfs:Class;
    gezr:name xsd:string;
    gezr:attachedPalm gezr:palm;
    gezr:attachedSkinColor gezr:skinColor;
    gezr:attachedFingers gezr:fingers;
    gezr:attachedAction gezr:action.
gezr:action a rdfs:Class;
    gezr:name xsd:string.
    '''
    #print(schema)
    graph.parse(format='turtle',data=schema)

def add_triples(palm_values=[0,0,0],skin_colors=[0,0,0],fingers=5,gesture="none",action="none"):
    palm_node=rdflib.BNode()
    graph.add((palm_node,rdflib.namespace.RDF['type'],gezr_namespace['palm']))
    skin_node = rdflib.BNode()
    graph.add((skin_node, rdflib.namespace.RDF['type'], gezr_namespace['skinColor']))
    finger_node = rdflib.BNode()
    graph.add((finger_node, rdflib.namespace.RDF['type'], gezr_namespace['fingers']))
    gesture_node = rdflib.BNode()
    graph.add((gesture_node, rdflib.namespace.RDF['type'], gezr_namespace['gesture']))
    action_node = rdflib.BNode()
    graph.add((action_node, rdflib.namespace.RDF['type'], gezr_namespace['action']))

    graph.add((palm_node, gezr_namespace['x'],rdflib.Literal(palm_values[0])))
    graph.add((palm_node, gezr_namespace['y'], rdflib.Literal(palm_values[1])))
    graph.add((palm_node, gezr_namespace['r'], rdflib.Literal(palm_values[2])))

    graph.add((skin_node, gezr_namespace['r'], rdflib.Literal(skin_colors[0])))
    graph.add((skin_node, gezr_namespace['g'], rdflib.Literal(skin_colors[1])))
    graph.add((skin_node, gezr_namespace['b'], rdflib.Literal(skin_colors[2])))

    graph.add((finger_node, gezr_namespace['amount'], rdflib.Literal(fingers)))
    graph.add((action_node, gezr_namespace['name'], rdflib.Literal(action)))

    graph.add((gesture_node, gezr_namespace['name'], rdflib.Literal(gesture)))
    graph.add((gesture_node, gezr_namespace['attachedPalm'], palm_node))
    graph.add((gesture_node, gezr_namespace['attachedSkinColor'], skin_node))
    graph.add((gesture_node, gezr_namespace['attachedFingers'], finger_node))
    graph.add((gesture_node, gezr_namespace['attachedAction'], action_node))


def load_graph():
    graph.parse("../storage/graph.json", format="json-ld")

def save_graph():
    graph.serialize(destination="../storage/graph.json", format="json-ld")

def query(sparql="",format="json"):
    #for selects-> json
    #for constructs -> json-ld
    res=graph.query(sparql)
    return res.serialize(format=format)

def __populate(amount=50):
    for i in range(50):
        add_triples([random.randint(0,255), random.randint(0,255), random.randint(0,255)], [random.randint(0,255), random.randint(0,255), random.randint(0,255)], random.randint(0,255), str(random.randint(0,255)), str(random.randint(0,255)))

if __name__ == '__main__':
    __populate()
    print(query('''SELECT ?a
    WHERE {
        ?a ?b ?c.
    }
    ''',format="json"))
    print(query('''CONSTRUCT {?a ?b ?c}
    WHERE {
        ?a ?b ?c.
    }
    ''',format="json-ld"))
