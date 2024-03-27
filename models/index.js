// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // foreign key in the Product model
});

// Categories have many Products
Product.belongsToMany(Tag, {
  through: ProductTag, 
  foreignKey: 'product_id', //foreign key in the Product model
});

// Products belongToMany Tags (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, 
  foreignKey: 'tag_id', // foreign key in the Tag model
});
// Tags belongToMany Products (through ProductTag)
Category.hasMany(Product, {
  foreignKey: 'category_id', //foreign key in the Product model
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
