// utils/Garments.js
const images = {
  shirts: {
    backCuts: import.meta.glob("../assets/images/shirts/backCuts/*.jpg"),
    backYokes: import.meta.glob("../assets/images/shirts/backYokes/*.jpg"),
    buttons: import.meta.glob("../assets/images/shirts/buttons/*.jpg"),
    collars: import.meta.glob("../assets/images/shirts/collars/*.jpg"),
    cuffCorners: import.meta.glob("../assets/images/shirts/cuffCorners/*.jpg"),
    cuffs: import.meta.glob("../assets/images/shirts/cuffs/*.jpg"),
    fastenings: import.meta.glob("../assets/images/shirts/fastenings/*.jpg"),
    pockets: import.meta.glob("../assets/images/shirts/pockets/*.jpg"),
    sleeves: import.meta.glob("../assets/images/shirts/sleeves/*.jpg"),
  },
  poloShirts: {
    collars: import.meta.glob("../assets/images/poloShirts/collars/*.jpg"),
    pockets: import.meta.glob("../assets/images/poloShirts/pockets/*.jpg"),
    sleeves: import.meta.glob("../assets/images/poloShirts/sleeves/*.jpg"),
  },
  coats: {
    lapelButtonHoles: import.meta.glob(
      "../assets/images/coats/lapelButtonHoles/*.png"
    ),
    lapelStyles: import.meta.glob("../assets/images/coats/lapelStyles/*.png"),
    lapelWidths: import.meta.glob("../assets/images/coats/lapelWidths/*.png"),
    pocketStyles: import.meta.glob("../assets/images/coats/pocketStyles/*.png"),
    sleeveButtonNumbers: import.meta.glob(
      "../assets/images/coats/sleeveButtonNumbers/*.png"
    ),
    sleeveButtons: import.meta.glob(
      "../assets/images/coats/sleeveButtons/*.png"
    ),
    styles: import.meta.glob("../assets/images/coats/styles/*.png"),
    ticketPockets: import.meta.glob(
      "../assets/images/coats/ticketPockets/*.png"
    ),
  },
  overcoats: {
    lapelButtonHoles: import.meta.glob(
      "../assets/images/overcoats/lapelButtonHoles/*.png"
    ),
    lapelStyles: import.meta.glob(
      "../assets/images/overcoats/lapelStyles/*.png"
    ),
    lapelWidths: import.meta.glob(
      "../assets/images/overcoats/lapelWidths/*.png"
    ),
    pocketStyles: import.meta.glob(
      "../assets/images/overcoats/pocketStyles/*.png"
    ),
    sleeveButtonNumbers: import.meta.glob(
      "../assets/images/overcoats/sleeveButtonNumbers/*.png"
    ),
    sleeveButtons: import.meta.glob(
      "../assets/images/overcoats/sleeveButtons/*.png"
    ),
    styles: import.meta.glob("../assets/images/overcoats/styles/*.png"),
    ticketPockets: import.meta.glob(
      "../assets/images/overcoats/ticketPockets/*.png"
    ),
  },
  pants: {
    backPockets: import.meta.glob("../assets/images/pants/backPockets/*.png"),
    beltLoops: import.meta.glob("../assets/images/pants/beltLoops/*.png"),
    buttons: import.meta.glob("../assets/images/pants/buttons/*.png"),
    cuffs: import.meta.glob("../assets/images/pants/cuffs/*.png"),
    frontClosures: import.meta.glob(
      "../assets/images/pants/frontClosures/*.png"
    ),
    frontPockets: import.meta.glob("../assets/images/pants/frontPockets/*.png"),
    pleats: import.meta.glob("../assets/images/pants/pleats/*.png"),
    pocketButtons: import.meta.glob(
      "../assets/images/pants/pocketButtons/*.png"
    ),
  },
  jeans: {
    backPockets: import.meta.glob("../assets/images/jeans/backPockets/*.png"),
    cuffs: import.meta.glob("../assets/images/jeans/cuffs/*.png"),
    finishings: import.meta.glob("../assets/images/jeans/finishings/*.png"),
    fits: import.meta.glob("../assets/images/jeans/fits/*.png"),
    flys: import.meta.glob("../assets/images/jeans/flys/*.png"),
    frontPockets: import.meta.glob("../assets/images/jeans/frontPockets/*.png"),
    lengths: import.meta.glob("../assets/images/jeans/lengths/*.png"),
  },
  chinos: {
    backPockets: import.meta.glob("../assets/images/chinos/backPockets/*.png"),
    cargoPockets: import.meta.glob(
      "../assets/images/chinos/cargoPockets/*.png"
    ),
    fastenings: import.meta.glob("../assets/images/chinos/fastenings/*.png"),
    fits: import.meta.glob("../assets/images/chinos/fits/*.png"),
    frontPockets: import.meta.glob(
      "../assets/images/chinos/frontPockets/*.png"
    ),
    hemlines: import.meta.glob("../assets/images/chinos/hemlines/*.png"),
    lengths: import.meta.glob("../assets/images/chinos/lengths/*.png"),
    pleats: import.meta.glob("../assets/images/chinos/pleats/*.png"),
  },
};

export const loadImages = async (parentDir, subDir) => {
  if (parentDir === "shirts") {
    parentDir === "shirts";
  } else if (parentDir === "poloShirts") {
    parentDir === "poloShirts";
  } else if (parentDir === "coats") {
    parentDir === "coats";
  }

  const importObj = images[parentDir]?.[subDir];
  if (!importObj) return [];

  const imageList = await Promise.all(
    Object.entries(importObj).map(async ([path, image]) => {
      const img = await image();
      const imageValue = path
        .split("/")
        .pop()
        .replace(/\.(jpg|png)$/, "");
      const name = imageValue
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return {
        name: name,
        value: imageValue,
        src: img.default,
      };
    })
  );

  return imageList;
};

export const formatName = (type) => {
  return type
    .split(/(?=[A-Z])/)
    .join(" ")
    .replace(/^\w/, (c) => c.toUpperCase());
};
