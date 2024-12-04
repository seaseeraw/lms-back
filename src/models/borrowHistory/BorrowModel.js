import BorrowSchema from "./BorrowSchema.js";

// insert
export const insertBurrow = (obj) => {
  return BorrowSchema(obj).save();
};

//Read all for the admin || public
export const getAllBurrows = (filter) => {
  return BorrowSchema.find(filter);
};

// get burrow by Id
export const getABurrowById = (_id) => {
  return BorrowSchema.findById(_id);
};

// update burrow by id
export const updateABurrowById = (_id, obj) => {
  return BorrowSchema.findByIdAndUpdate(_id, obj);
};

// delete burrow by id
export const deleteABurrowById = (_id) => {
  return BorrowSchema.findByIdAndDelete(_id);
};
