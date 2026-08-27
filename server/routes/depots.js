import express from "express";
import {pool} from "../db.js";

const router = express.Router();

router.get("/:id", async (req, res) => {

const { rows } = await pool.query(
  `SELECT depot.id, personne.nom, ARRAY_AGG(objet.libelle) AS objets
   FROM depot
   JOIN personne ON personne.id = depot.personne_id
   JOIN objet ON objet.depot_id = depot.id
   WHERE depot.id = $1
   GROUP BY depot.id, personne.nom`,
  [req.params.id]
);
  if (rows.length === 0) {
  return res.status(404).json({ erreur: "Objet introuvable" });
}
 res.json(rows[0]);
})

export default router;