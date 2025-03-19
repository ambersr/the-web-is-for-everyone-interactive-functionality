// Filter functie op categorie
document.querySelectorAll("input[name='category']").forEach(radio => {
    radio.addEventListener("change", function () {
     const selectedCategory = this.value;

    // Verwijder de 'active' class van alle labels en voeg deze toe aan de geselecteerde
    document.querySelectorAll("input[name='category']").forEach(r => r.parentElement.classList.remove("active"));
    this.parentElement.classList.add("active");

    // URL aanpassen
    window.location.href = selectedCategory ? `/webinars/?category=${encodeURIComponent(selectedCategory)}` : "/webinars";
  });
  });

// Herstel 'active' class bij het laden van de pagina
window.addEventListener("load", () => {
  const selectedCategory = new URLSearchParams(window.location.search).get('category') || '';
  const selectedRadio = document.querySelector(`input[name='category'][value='${selectedCategory}']`);
  if (selectedRadio) selectedRadio.parentElement.classList.add("active");
});
