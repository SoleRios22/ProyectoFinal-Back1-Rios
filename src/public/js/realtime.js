const socket = io();
const list = document.getElementById("productsList");
const formAdd = document.getElementById("formAdd");
const formDel = document.getElementById("formDel");

socket.on("updateProducts", (products) => {
  list.innerHTML = "";
  products.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p._id} - ${p.title} - $${p.price}`;
    list.appendChild(li);
  });
});

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(formAdd);
  const product = Object.fromEntries(fd.entries());
  product.price = Number(product.price);
  product.thumbnails = product.thumbnail ? [product.thumbnail] : [];
  delete product.thumbnail;
  socket.emit("addProduct", product);
  formAdd.reset();
});

formDel.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = formDel.id.value;
  socket.emit("deleteProduct", id);
  formDel.reset();
});
