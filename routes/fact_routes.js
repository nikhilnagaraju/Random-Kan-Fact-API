const router = require("express").Router();
const {
  normalizeCount,
  getRandomFacts,
  getFactByID,
  createFact,
  removeFactByID,
  updateFactByID,
} = require("./utils");

router.get("/", (_req, res) => {
  const data = {
    status: "ok",
    message: "Why say Hello world!, when you can say HELLO UNIVERSE!",
    endpoints: {
      "GET /random": "Get a random kannada fact",
      "GET /facts": "Get an array of random kannada facts [array of size 10]",
      "POST /fact":
        "Create/Add a fact on hosted db; requires a json with 'fact' model as body",
      "PUT /fact/:id":
        "Update a fact using (integer)id on hosted DB; requires a json with 'fact' model as body",
      "DELETE /fact/:id": "Delete a fact with (integer)id on hosted DB",
    },
  };
  res.json(data);
});

// GET random fact
router.get("/random", async (req, res) => {
  try {
    const factsArray = await getRandomFacts(req.app.db, 1);
    if (factsArray.length > 0) {
      res.send(factsArray[0]);
    } else {
      res.status(400).json({
        status: "error",
        message: "No Data found.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "failure",
      error: "An error has occurred while fetching data",
    });
  }
});

// GET an array of 10 Random Facts
router.get("/facts", async (req, res) => {
  const size = normalizeCount(parseInt(req.query.count));
  const factsArray = await getRandomFacts(req.app.db, size);
  if (factsArray.length !== size) {
    res.status(400).json({
      status: "error",
      message: "No Data found.",
    });
  } else {
    res.json({ facts: factsArray, count: factsArray.length });
  }
});

// GET a Fact by ID
router.get("/facts/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      status: "error",
      message: "Invalid Document ID",
    });
  }
  try {
    const fact = await getFactByID(req.app.db, req.params.id);
    if (!fact) {
      return res.status(404).json({
        status: "error",
        message: `Document with ID ${req.params.id} doesn't exist.`,
      });
    }
    res.json(fact);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Invalid document ID.",
    });
  }
  return {};
});

// POST a fact
router.post("/facts", async (req, res) => {
  if (!req.body.fact_en || !req.body.fact_kn) {
    res.status(400).json({
      status: "error",
      message: "Both 'fact_en' and `fact_kn` data is required",
    });
    return;
  }
  const data = {
    fact_en: req.body.fact_en,
    fact_kn: req.body.fact_kn,
    imgurl: req.body.imgurl,
  };
  try {
    const result = await createFact(res.app.db, data);
    res.json(result.ops[0]);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Failed to create fact",
    });
  }
});

// UPDATE a fact with id
router.put("/facts/:id", async (req, res) => {
  if (!req.body.fact_en || !req.body.fact_kn) {
    res.status(400).json({
      status: "error",
      message: "Both 'fact_en' and `fact_kn` data is required",
    });
    return;
  }
  const fact = {
    fact_en: req.body.fact_en,
    fact_kn: req.body.fact_kn,
    imgurl: req.body.imgurl,
  };
  try {
    const result = await updateFactByID(req.app.db, req.params.id, fact);
    res.json(result.value);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Failed to update fact",
    });
  }
});

// DELETE a fact with id
router.delete("/facts/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      status: "error",
      message: "Invalid Document ID",
    });
  }
  try {
    await removeFactByID(req.app.db, req.params.id);
    res.json({ removedId: req.params.id });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete Document with id ${req.params.id}`,
    });
  }
});

module.exports = router;
