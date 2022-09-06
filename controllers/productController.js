
const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.eliminarProductoPorId = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const foundProduct = products.filter((p) => p.id != req.params.id);
  if (foundProduct) {
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(foundProduct));
    res.status(200).json({
      status: "Se elimino el producto correctamente",
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.editarProductoPorId = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );  

  const foundProduct = products.find((p) => p.id == req.params.id);
    
  if (foundProduct) {
    const updateUser = req.body;
    products.forEach(product => {
    if (product.id === parseInt(req.params.id)) {
      product.name = updateUser.name ? updateUser.name : product.name;
      product.price = updateUser.price ? updateUser.price : product.price;
      product.category = updateUser.category ? updateUser.category : product.category;        
        }
    });

    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};