const textEl = document.querySelector<HTMLElement>("#text") as HTMLElement;

const levelEl = document.querySelector<HTMLElement>("#levelEl") as HTMLElement;

const scoreEl = document.querySelector<HTMLElement>("#scoreEl") as HTMLElement;

const leaderboardEl = document.querySelector<HTMLElement>(
  "#leaderboard-list"
) as HTMLElement;

const formEl = document.querySelector<HTMLFormElement>(
  "#score-form"
) as HTMLFormElement;

export { textEl, levelEl, scoreEl, leaderboardEl, formEl };
