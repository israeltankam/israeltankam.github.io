// pub_list/publist.js
// Auto-number publications inside #publications

(function () {
  const section = document.getElementById('publications');
  if (!section) return;

  const items = [...section.querySelectorAll('.pub-item')];
  items.forEach((item, i) => {
    const num = i + 1;

    // Prepend [n] if not already there
    const firstChild = item.firstElementChild;
    if (firstChild && !firstChild.textContent.trim().startsWith("[")) {
      firstChild.innerHTML = `<span class="font-bold text-blue-600">[${num}]</span> ${firstChild.innerHTML}`;
    }
  });
})();
