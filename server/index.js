import express from "express";
import { objets } from "./db_objet.js"; 
import  categoriesRouter from "./routes/categories.js";
import objetsRouter from "./routes/objets.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
import personnesRouter from "./routes/personnes.js";
import depotRouter from "./routes/depots.js";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/categories" , categoriesRouter);
app.use("/api/objets" , objetsRouter);
app.use("/api/personnes" , personnesRouter);
app.use("/api/depots", depotRouter)



// app.get("/:id", (req, res) => {
//   if (Number(req.params.id == 3)){
//     res.status(404).send("erreur, je ne veux pas de ce chiffre")
//   }
//   res.send("yanis la saucisse")
// });

// app.get("/:id", (req,res) => {
//   const idObjet = Number(req.params.id);
//   const findObjet = objets.find 
//  if( objet.id === idObjet)
//   res.send(findObjet)
// else{
//  return res.status(404).send("L'id n'existe pas sale nul")
// }
// })

app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
});

app.use((err, req, res, suite) => {
  console.error(err);                                   // le détail de l'erreur reste ici
  res.status(500).json({ erreur: 'Erreur interne du serveur' });  // le client reçoit un message propre
});