// interactivity goes here, section by section

// SECTION: How it works — auto-advancing step stepper
(function () {
  const stepsList = document.querySelector('[data-steps-list]');
  const steps = document.querySelectorAll('[data-step-item]');
  const panels = document.querySelectorAll('[data-step-panel]');
  const slider = document.querySelector('.step-slider');
  if (!steps.length || !panels.length || !stepsList) return;

  let active = 0;

  function moveSlider(index) {
    if (!slider) return;
    const target = steps[index].querySelector('.step-highlight');
    if (!target) return;
    const listRect = stepsList.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    slider.style.top = `${targetRect.top - listRect.top}px`;
    slider.style.left = `${targetRect.left - listRect.left}px`;
    slider.style.width = `${targetRect.width}px`;
    slider.style.height = `${targetRect.height}px`;
  }

  function setActive(index) {
    steps.forEach((step) => {
      step.classList.toggle('is-active', Number(step.dataset.stepItem) === index);
    });
    panels.forEach((panel) => {
      const isMatch = Number(panel.dataset.stepPanel) === index;
      panel.classList.toggle('opacity-100', isMatch);
      panel.classList.toggle('opacity-0', !isMatch);
      panel.classList.toggle('pointer-events-auto', isMatch);
      panel.classList.toggle('pointer-events-none', !isMatch);
    });
    moveSlider(index);
  }

  steps.forEach((step) => {
    step.addEventListener('click', () => {
      active = Number(step.dataset.stepItem);
      setActive(active);
    });
    step.style.cursor = 'pointer';
  });

  window.addEventListener('resize', () => moveSlider(active));
  window.addEventListener('load', () => moveSlider(active));
  setActive(active);

  setInterval(() => {
    active = (active + 1) % steps.length;
    setActive(active);
  }, 4000);
})();
