import express from "express";
import {pool} from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // récupère les filtres depuis la query string de l'URL (undefined si absents)
  const {statut, categorie_id} = req.query

  const { rows } = await pool.query(
    `SELECT  objet.libelle, objet.poids_kg, objet.etat_arrivee, objet.statut, objet.prix, objet.date_mise_rayon, objet.categorie_id, objet.depot_id, objet.vente_id, objet.prix_paye, categorie.libelle AS categorie 
    FROM objet 
    JOIN categorie ON categorie.id = objet.categorie_id  -- relie chaque objet à sa catégorie
    WHERE objet.statut = COALESCE($1, objet.statut)               -- si $1 est null, la condition devient toujours vraie (pas de filtre)
    AND objet.categorie_id = COALESCE($2, objet.categorie_id)     -- même principe pour le deuxième filtre
    ORDER BY objet.id`,
    [statut, categorie_id] // $1 = statut, $2 = categorie_id — requête paramétrée, jamais de concaténation
  );
  res.json(rows); 
});

router.get("/:id", async (req, res)=>{
  const { rows } = await pool.query(
    `SELECT objet.categorie_id, objet.depot_id, categorie.libelle AS categorie, depot.personne_id, personne.nom, personne.prenom
    FROM objet
    JOIN categorie ON categorie.id = objet.categorie_id 
    JOIN depot ON depot.id = objet.depot_id
    JOIN personne ON personne.id = depot.personne_id
    WHERE objet.id = $1
    ORDER BY objet.id`,
    [req.params.id]
    );
    if (rows.length === 0) {
  return res.status(404).json({ erreur: "Objet introuvable" });
}
  res.json(rows[0]); 
}
)

router.patch("/:id/statut", async (req, res) => {
  const { statut, prix } = req.body;
  const objetId = req.params.id
  const STATUTS = ["arrive", "en_reparation", "en_rayon", "vendu", "recycle"];
  if (!STATUTS.includes(statut)) {
    return res.status(400).json({ erreur: "Statut invalide" });
  }

  const { rows } = await pool.query(
    `UPDATE objet
     SET statut = $2::statut_objet,
         prix = COALESCE($3, prix),
         date_mise_rayon = CASE WHEN $2 = 'en_rayon' THEN CURRENT_DATE ELSE date_mise_rayon END
     WHERE id = $1 RETURNING *`,
    [objetId, statut, prix ?? null]
  );

  if (rows.length === 0) return res.status(404).json({ erreur: "Introuvable" });
  res.json(rows[0]);
});

// router.post("/",async(req,res) => {
//     console.log("hello");
//   const {libelle, poids_kg, etat_arrivee, statut, prix, date_mise_rayon, categorie_id, depot_id, vente_id, prix_paye} = req.body
//   const { rows } = await pool.query(`INSERT INTO objet (libelle, poids_kg, etat_arrivee, statut, prix, date_mise_rayon, categorie_id, depot_id, vente_id, prix_paye) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,[libelle, poids_kg, etat_arrivee, statut, prix, date_mise_rayon, categorie_id, depot_id, vente_id, prix_paye]);
//   res.json(rows);
// })

export default router