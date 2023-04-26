import sys
import json
import datetime
import random as rnd

data = []
tittelit = [ "Röntgenhoitaja", "Sairaanhoitaja", "Lähihoitaja", "Hammashoitaja", "Suuhygienisti", "Sosiaalityöntekijä"]
osastot = [ "Ihotautien poliklinikka", "Keskusleikkausosasto", "Yhteispäivystys" ]
edut = [["Lounasetu", "30€ bonus"], ["40€ bonus"], ["Lounasetu"], [], [], [], [], []]
organisaatiot = [
    {
        "organisaatio": "Pohjois-Pohjanmaan hyvinvointialue Pohde",
        "osoitteet": [
            {
                "osoite": "Torikatu 21, 90100 OULU",
                "kaupunki": "Oulu",
                "koordinaatit": {
                    "latitude": 65.01104770301926,
                    "longitude": 25.466729956534994
                }
            },
            {
                "osoite": "Pesätie 11, 90420 OULU",
                "kaupunki": "Oulu",
                "koordinaatit": {
                    "latitude": 64.95636793384206,
                    "longitude": 25.531864452214528
                }
            },
            {
                "osoite": "Kirkkotie 21, 90440 KEMPELE",
                "kaupunki": "Kempele",
                "koordinaatit": {
                    "latitude": 64.91469977241674,
                    "longitude": 25.489666342310308
                }
            }
        ],
        "kontakti": {
            "email": "sijaisuudet@pohde.fi",
            "phoneNumber": "0551234567"
        }
    },
    {
        "organisaatio": "Varsinais-Suomen hyvinvointialue Varha",
        "osoitteet": [
            {
                "osoite": "Hämeentie 11, 20521 TURKU",
                "kaupunki": "Turku",
                "koordinaatit": {
                    "latitude": 60.454266053829656,
                    "longitude": 22.295853144213755
                }
            },
            {
                "osoite": "Käsityöläiskatu 2, 20100 TURKU",
                "kaupunki": "Turku",
                "koordinaatit": {
                    "latitude": 60.448420880529184,
                    "longitude": 22.2585894854291
                }
            },
            {
                "osoite": "Tuulensuunkatu 6, 21100 Naantali",
                "kaupunki": "Naantali",
                "koordinaatit": {
                    "latitude": 60.4691794883538,
                    "longitude": 22.026600512353554
                }
            }
        ],
        "kontakti": {
            "email": "sijaisuudet@varha.fi",
            "phoneNumber": "0551234567"
        }
    },
]

print("Kuinka monta sijaisuutta luodaan?")

lkm = int(input("> "))

if lkm > 1000:
    print("\nVouh! Kuinkas paljon meinasit muistia rohmuta?")
    sys.exit()

with open("substitutionsData_new.json", "w", encoding="utf-8") as target:
    for i in range(lkm):
        if rnd.choice([True, False]):
            logo = "lintunen.png"
            image = "https://picsum.photos/400"
        else:
            logo = ""
            image = ""
        
        organisaatio = rnd.choice(organisaatiot)
        sijainti = rnd.choice(organisaatio["osoitteet"])
        sijaisuus = {
            "id": i,
            "date": (datetime.datetime(year=2023, month=4, day=13, hour=12, minute=0, second=0) + datetime.timedelta(hours=i)).isoformat(),
            "title": rnd.choice(tittelit),
            "description": "Tähän tulee lyhyt kuvaus työstä",
            "department": rnd.choice(osastot),
            "organisation": organisaatio["organisaatio"],
            "location": sijainti["osoite"],
            "city": sijainti["kaupunki"],
            "coordinates": {
                "longitude": sijainti["koordinaatit"]["longitude"],
                "latitude": sijainti["koordinaatit"]["latitude"]
            },
            "timing": {
                "startTime": (datetime.datetime(year=2023, month=4, day=13, hour=12, minute=0, second=0) + datetime.timedelta(hours=i*3)).isoformat(),
                "duration": round(rnd.randint(240, 480) / 10) * 10,
                "isFlexible": rnd.choice([True, False])
            },
            "hourlyPay": round(rnd.uniform(10.0, 20.0), 2),
            "benefits": rnd.choice(edut),
            "contactInfo": organisaatio["kontakti"],
            "logo": logo,
            "image": image,
            "needsConfirmation": rnd.choice([True, False])
        }
        data.append(sijaisuus)
    rnd.shuffle(data)
    json.dump(data, target, indent=2, ensure_ascii=False)
