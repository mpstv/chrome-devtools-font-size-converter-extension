"use strict";

var getElementInfo = function detectElement() {
  var selectedElement = $0;
  var data = Object.create(null);

  //coefficient for convert px to pt
  const PX_TO_PT_COEFFICIENT = 0.75;

  if (selectedElement) {
    var computedStyles = window.getComputedStyle(selectedElement);
    var fontSizeInPx = parseFloat(computedStyles.fontSize);

    data["Font size"] = `${computedStyles.fontSize} -> ${fontSizeInPx * PX_TO_PT_COEFFICIENT}pt`;
  }
  return data;
};

chrome.devtools.panels.elements.createSidebarPane(
  "Font size converter",
  function (sidebar) {
    var onSelectionChanged = function () {
      sidebar.setExpression("(" + getElementInfo.toString() + ")()");
    };
    onSelectionChanged();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(
      onSelectionChanged
    );
  }
);
