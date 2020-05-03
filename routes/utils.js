const ObjectID = require("mongodb").ObjectID;
const FACTS_COLLECTION = "factslist";

const normalizeCount = (size) => {
  if (!size) size = 10;
  if (size > 20) size = 20;
  return size;
};

const getRandomFacts = (db, size) => {
  const querySize = normalizeCount(size);
  return db
    .collection(FACTS_COLLECTION)
    .aggregate([{ $sample: { size: querySize } }])
    .toArray();
};

const getFactByID = (db, id) => {
  return db.collection(FACTS_COLLECTION).findOne({ _id: ObjectID(id) });
};

const createFact = (db, data) => {
  return db.collection(FACTS_COLLECTION).insertOne(data);
};

const removeFactByID = (db, id) => {
  return db.collection(FACTS_COLLECTION).remove({ _id: ObjectID(id) });
};

const updateFactByID = (db, id, data) => {
  return db
    .collection(FACTS_COLLECTION)
    .findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: data },
      { returnOriginal: false }
    );
};

module.exports = {
  normalizeCount,
  getRandomFacts,
  getFactByID,
  createFact,
  removeFactByID,
  updateFactByID,
};
