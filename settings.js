let e = {
    imdb: !0,
    rt: !0,
    metascore: !0,
    douban: !0,
  },
  t = [];

function n(t) {
  const n = t.target;
  n &&
    ((e[n.name] = n.checked),
    chrome.tabs.query(
      {
        currentWindow: !0,
        active: !0,
      },
      (t) => {
        const n = t[0];
        chrome.tabs.sendMessage(n.id, {
          name: "settings",
          data: e,
        });
      }
    ),
    chrome.storage.local.set({
      settings: e,
    }));
}
!(function () {
  const o = chrome.runtime.getURL(""),
    a = document.querySelectorAll(".list label > div");
  Array.from(a).forEach((e) => {
    const t = e.closest("label").getAttribute("data-name");
    e.style.backgroundImage = `url(${o}images/${t}_logo.png)`;
  }),
    chrome.storage.local.get("settings", (t) => {
      t.settings && (e = t.settings),
        document.querySelectorAll("label").forEach((t) => {
          const o = document.createElement("input"),
            a = t.getAttribute("data-name");
          (o.type = "checkbox"),
            (o.name = a),
            o.setAttribute("data-on", "on"),
            o.setAttribute("data-off", "off"),
            (o.checked = e[a]),
            o.addEventListener("input", n),
            t.firstElementChild.after(o);
        }),
        chrome.tabs.query(
          {
            currentWindow: !0,
            active: !0,
          },
          (t) => {
            const n = t[0];
            chrome.tabs.sendMessage(n.id, {
              name: "settings",
              data: e,
            });
          }
        );
    }),
    chrome.runtime.sendMessage(
      {
        type: "notification",
        method: "GET",
      },
      (e) => {
        e.data &&
          e.data.length &&
          ((t = e.data),
          t.forEach((e) => {
            !(function (e, n) {
              const o = document.createElement("p");
              if (
                (o.setAttribute("data-id", e.id),
                (o.textContent = e.title || e.content),
                e.link)
              ) {
                const t = document.createElement("a");
                t.setAttribute("noopener", !0),
                  (t.target = "_blank"),
                  (t.href = e.link),
                  (t.textContent = "view"),
                  o.append(t);
              }
              const a = document.createElement("button");
              a.setAttribute("aria-label", "close"),
                (a.textContent = "×"),
                a.addEventListener("click", () => {
                  !(function (e) {
                    (t = t.filter((t) => t.id !== e.id)),
                      chrome.runtime.sendMessage({
                        type: "notification",
                        data: t,
                      }),
                      chrome.runtime.sendMessage({
                        type: "notification",
                        method: "POST",
                        data: t,
                      });
                  })(e),
                    o.remove();
                }),
                o.append(a),
                n.append(o);
            })(e, document.querySelector(".notification"));
          }));
      }
    ),
    chrome.storage.local.get("hasReviewed", ({ hasReviewed: e }) => {
      if (!e) {
        const e = document.createElement("section");
        e.className = "section extra";
        const t = document.createElement("a");
        (t.className = "rate"),
          (t.target = "_blank"),
          (t.href =
            "https://github.com/JustAuramo/Popcorn-Ratings-Netflix"),
          t.setAttribute("noopener", ""),
          (t.textContent = "love me, rate me"),
          e.append(t),
          document.querySelector(".section.rating").before(e),
          t.addEventListener("click", () => {
            chrome.storage.local.set({
              hasReviewed: !0,
            }),
              t.remove();
          });
      }
    });
})();
