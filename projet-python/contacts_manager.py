# contacts_manager.py
import csv

contacts = []

def ajouter_contact(nom, email, telephone=""):
    contacts.append({"Nom": nom, "Email": email, "Téléphone": telephone})
    print(f"Contact ajouté : {nom}")

def afficher_contacts():
    print("\nListe des contacts :")
    for i, c in enumerate(contacts,1):
        print(f"{i}. {c['Nom']} - {c['Email']} - {c['Téléphone']}")

def chercher_contact(nom):
    print(f"\nRecherche pour '{nom}' :")
    for c in contacts:
        if nom.lower() in c['Nom'].lower():
            print(f"- {c['Nom']} : {c['Email']} ({c['Téléphone']})")

def exporter_csv(fichier="contacts.csv"):
    keys = ["Nom", "Email", "Téléphone"]
    with open(fichier, "w", newline="", encoding="utf-8") as f:
        dict_writer = csv.DictWriter(f, keys)
        dict_writer.writeheader()
        dict_writer.writerows(contacts)
    print(f"\nContacts exportés dans {fichier}")

# Exemple d'utilisation
if __name__ == "__main__":
    ajouter_contact("Aaron Prin","aaronprin44@gmail.com")
    ajouter_contact("John Doe","john@example.com","123-456-7890")
    afficher_contacts()
    chercher_contact("Aaron")
    exporter_csv()
