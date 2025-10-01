document.querySelectorAll(".addToCart").forEach(btn => {
  btn.addEventListener("click", async (e) => {
    const pid = e.target.dataset.id;
    let cid = localStorage.getItem("cartId");
    if (!cid) {
      const res = await fetch('/api/carts', { method: 'POST' });
      const cart = await res.json();
      cid = cart._id || cart.id || cart._id;
      localStorage.setItem("cartId", cid);
    }
    await fetch(`/api/carts/${cid}/product/${pid}`, { method: 'POST' });
    alert('Agregado al carrito');
  });
});
