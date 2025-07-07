import Window from "../types/global";

const popupCenter = (url: string, title: string, oninteract: () => void) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;

  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height =
    window.innerHeight ??
    document.documentElement.clientHeight ??
    screen.height;

  const systemZoom = width / window.screen.availWidth;

  const left = (width - 1000) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    url,
    title,
    `location=no,toolbar=no,menubar=no,status=no,scrollbars=yes,width=${1000 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
  );

  if (newWindow) {
    (newWindow as unknown as Window).suku = oninteract;
    newWindow.opener = null;
    newWindow.sessionStorage.clear();
    newWindow.focus();
  }

  const interval = setInterval(() => {
    if (newWindow?.closed) {
      clearInterval(interval);
      // onclose();
    }
  }, 500);
};

export default popupCenter;
