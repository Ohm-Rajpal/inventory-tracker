// eventually this data needs to come from a database

const item = [
    [{"item":"Nitrogen","quantity":25},
        {"item":"CLOTRIMAZOLE","quantity":32},
        {"item":"Western Water Hemp","quantity":56},
        {"item":"Docusate sodium and Sennosides","quantity":52},
        {"item":"Ibuprofen","quantity":86},
        {"item":"Phenylephrine Hydrochloride","quantity":89},
        {"item":"ACONITUM NAPELLUS - APIS MELLIFERA - ATROPA BELLADONNA - BASIC CUPRIC CARBONATE - BRYONIA ALBA ROOT - CALCIUM SULFIDE - CITRIC ACID MONOHYDRATE - FERRIC PHOSPHATE - INTERLEUKIN-10 - MELATONIN - METENK","quantity":62},
        {"item":"Aspirin, Citric Acid Monohydrate, and Sodium Bicarbonate","quantity":11},
        {"item":"DIMETHICONE","quantity":37},
        {"item":"Alcohol","quantity":56},
        {"item":"Hydrochlorothiazide","quantity":31},
        {"item":"Ceftriaxone Sodium","quantity":74},
        {"item":"amlodipine besylate","quantity":42},
        {"item":"Hickory Pollen Mixture","quantity":63},
        {"item":"Ondansetron Hydrochloride","quantity":13},
        {"item":"zoledronic acid","quantity":69},
        {"item":"Aluminum Zirconium Tetrachlorohydrex GLY","quantity":2},
        {"item":"abacavir sulfate","quantity":39},
        {"item":"Berberis Larix","quantity":66},
        {"item":"rabeprazole","quantity":100}]
]

// define the type called Item
type Item = (typeof item)[0];