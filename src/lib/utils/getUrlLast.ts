export function getUrlLast() {
  return (
    location.href.split('/').pop()?.replace(/\?.+/, '').replace(/#.+/, '') || ''
  );
}
