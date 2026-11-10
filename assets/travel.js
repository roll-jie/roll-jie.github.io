(() => {
  const map = document.getElementById("travel-map");
  const provinceSelect = document.getElementById("province");
  const gallery = document.getElementById("photos");
  const heading = document.getElementById("gallery-heading");
  const status = document.getElementById("gallery-status");
  const photosByProvince = new Map();
  for (const province of new Set([...travel.visited, ...Object.keys(travelPhotosByProvince)])) {
    const filenames = travelPhotosByProvince[province];
    if (!filenames?.length || !Object.hasOwn(chinaMap.provinces, province)) continue;

    photosByProvince.set(province, filenames.map(filename => ({
      ...travel.photoDetails?.[province]?.[filename],
      province,
      src: `photos/${encodeURIComponent(province)}/${encodeURIComponent(filename)}`,
    })));
  }
  const allPhotos = [...photosByProvince.values()].flat();
  const visited = new Set([...travel.visited, ...photosByProvince.keys()]);
  const groups = new Map();
  const svgNamespace = "http://www.w3.org/2000/svg";

  function mapPath(d, className) {
    const path = document.createElementNS(svgNamespace, "path");
    path.setAttribute("d", d);
    path.setAttribute("class", className);
    return path;
  }

  function renderGallery() {
    const selectedProvince = provinceSelect.value;
    for (const [name, group] of groups) {
      group.setAttribute("aria-pressed", String(name === selectedProvince));
    }

    heading.textContent = selectedProvince ? `${selectedProvince} · 旅行照片` : "旅行照片";
    const photos = selectedProvince ? (photosByProvince.get(selectedProvince) ?? []) : allPhotos;
    status.textContent = photos.length ? "" : "暂无照片";

    gallery.replaceChildren(...photos.map(photo => {
      const title = photo.title?.trim();
      const card = document.createElement("figure");
      const link = document.createElement("a");
      const img = document.createElement("img");
      const caption = document.createElement("figcaption");
      link.href = photo.src;
      img.src = photo.src;
      img.alt = photo.alt || title || `${photo.province}旅行照片`;
      img.loading = "lazy";
      caption.textContent = title ? `${title} · ${photo.province}` : photo.province;
      link.append(img);
      card.append(link, caption);
      return card;
    }));
  }

  map.setAttribute("viewBox", chinaMap.viewBox);
  const inset = map.querySelector(".map-inset");
  inset.setAttribute("x", chinaMap.inset.x);
  inset.setAttribute("y", chinaMap.inset.y);
  inset.querySelector(".map-inset-geography").append(
    mapPath(chinaMap.inset.land, "map-inset-land"),
    mapPath(chinaMap.inset.boundaries, "map-boundary"),
  );

  for (const [name, d] of Object.entries(chinaMap.provinces)) {
    const group = document.createElementNS(svgNamespace, "g");
    group.classList.add("province");
    group.classList.toggle("visited", visited.has(name));
    group.setAttribute("role", "button");
    group.setAttribute("tabindex", "0");
    group.setAttribute("aria-label", name);
    group.setAttribute("aria-controls", "photos");
    const title = document.createElementNS(svgNamespace, "title");
    title.textContent = name;
    group.append(title, mapPath(d, "province-shape"));
    map.insertBefore(group, inset);

    function toggleProvince() {
      provinceSelect.value = provinceSelect.value === name ? "" : name;
      renderGallery();
    }

    group.addEventListener("click", toggleProvince);
    group.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!event.repeat) toggleProvince();
      }
    });
    groups.set(name, group);
    provinceSelect.add(new Option(name, name));
  }

  map.insertBefore(mapPath(chinaMap.boundaries, "map-boundary"), inset);
  provinceSelect.hidden = false;
  provinceSelect.addEventListener("change", renderGallery);
  renderGallery();
})();
