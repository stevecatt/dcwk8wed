'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    category: DataTypes.STRING,
    ispublished:DataTypes.BOOLEAN

  }, {});
  Blog.associate = function(models) {
    Blog.hasMany(models.Comment,{
      as:'comments',
      foreignKey: 'blogid'
    })
  };
  return Blog;
};