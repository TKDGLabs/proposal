"use client";

import { useEffect } from "react";

const stats = [
  { label: "광고 카피 성과", value: 6.08, decimals: 2, suffix: "%", desc: "여성 페미닌 에티켓 제품 CTR" },
  { label: "전환 결과", value: 97, decimals: 0, suffix: "건", desc: "상세페이지 기획 및 운영으로 구매 전환" },
  { label: "운영 효율", value: 24.2, decimals: 1, prefix: "+", suffix: "%", desc: "지역 키워드 기반 SEO 방문자 증가" }
];

const projects = [
  {
    tag: "Performance & Commerce",
    title: "여성 페미닌 에티켓 제품 마케팅",
    copy: "“먹지말고 뿌리자” 카피 중심 A/B 테스트와 상세페이지 구조 재설계로 전환 흐름 정리",
    metric: "CTR 6.08% · 구매 전환 97건",
    thumb: "one",
    image: "/images/projects/ph40-product.png",
    fit: "contain",
    storeLink: "https://smartstore.naver.com/gbb21",
    storeLabel: "펜톡 스마트스토어 보기 ↗"
  },
  {
    tag: "SEO & Local Marketing",
    title: "치과 블로그·플레이스 최적화",
    copy: "‘지역명 + 치료’ 키워드 구조 재편으로 블로그/플레이스 노출 흐름 동시 개선",
    metric: "월 조회수 3,149 · 방문자 +24.2%",
    thumb: "two",
    image: "/images/projects/ph40-store.png",
    fit: "cover"
  },
  {
    tag: "0 to 1 Launching",
    title: "마스뚜르조 런칭 사전 구축",
    copy: "시장조사, 스마트스토어 세팅, 상세페이지, 체험단 운영까지 온라인 판매 기반 세팅",
    metric: "홈쇼핑 진행 직전 단계까지 기반 구축",
    thumb: "three",
    image: "/images/projects/masturzo-store.png",
    fit: "cover",
    storeLink: "https://smartstore.naver.com/masturzo_kr",
    storeLabel: "마스뚜르조 스마트스토어 보기 ↗"
  },
  {
    tag: "Viral & Project Management",
    title: "성형외과 병원 카페 바이럴 운영",
    copy: "병원별 커뮤니케이션, 일정 조율, 게시글 기획·업로드·노출 관리까지 운영 프로세스를 표준화",
    metric: "최대 8개 병원 동시 운영 · 일 최대 25건 실행",
    thumb: "four",
    image: "/images/projects/yeouya-cafe.png",
    fit: "cover"
  }
];

const leverageBars = [
  { label: "Execution", value: 96 },
  { label: "Multi-Project PM", value: 92 },
  { label: "Performance/SEO", value: 89 },
  { label: "AI Prototyping", value: 85 }
];

export default function Page() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];

    const profileImage = document.getElementById("mk-profile") as HTMLImageElement | null;
    let onProfileError: (() => void) | null = null;
    if (profileImage) {
      onProfileError = () => {
        profileImage.src = "/profile-placeholder.svg";
      };
      profileImage.addEventListener("error", onProfileError);
    }

    const revealNodes = Array.from(document.querySelectorAll(".mk-reveal"));
    if (reducedMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
    } else if (revealNodes.length) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      revealNodes.forEach((node) => revealObserver.observe(node));
      observers.push(revealObserver);
    }

    const countNodes = Array.from(document.querySelectorAll("[data-count]"));
    if (countNodes.length) {
      const runCounter = (node: Element) => {
        const target = Number(node.getAttribute("data-count") || 0);
        const decimals = Number(node.getAttribute("data-decimals") || 0);
        const prefix = node.getAttribute("data-prefix") || "";
        const suffix = node.getAttribute("data-suffix") || "";
        if (reducedMotion) {
          node.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
          return;
        }
        let startTime: number | null = null;
        const duration = 1200;
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const display = (target * eased).toFixed(decimals);
          node.textContent = `${prefix}${display}${suffix}`;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      };

      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.45 }
      );
      countNodes.forEach((node) => counterObserver.observe(node));
      observers.push(counterObserver);
    }

    const barNodes = Array.from(document.querySelectorAll(".mk-bar-fill")) as HTMLElement[];
    const barsRoot = document.getElementById("mk-bars");
    if (barsRoot && barNodes.length) {
      const fillBars = () => {
        barNodes.forEach((node) => {
          const width = Math.min(100, Number(node.dataset.width || 0));
          node.style.width = `${width}%`;
        });
      };

      if (reducedMotion) {
        fillBars();
      } else {
        const barObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                fillBars();
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 }
        );
        barObserver.observe(barsRoot);
        observers.push(barObserver);
      }
    }

    return () => {
      if (profileImage && onProfileError) {
        profileImage.removeEventListener("error", onProfileError);
      }
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <main className="mk-root">
      <style jsx global>{`
        @font-face {
          font-family: "Wanted Sans";
          src: url("/fonts/wanted/WantedSans-Regular.woff2") format("woff2");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Wanted Sans";
          src: url("/fonts/wanted/WantedSans-Medium.woff2") format("woff2");
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Wanted Sans";
          src: url("/fonts/wanted/WantedSans-SemiBold.woff2") format("woff2");
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Wanted Sans";
          src: url("/fonts/wanted/WantedSans-Bold.woff2") format("woff2");
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Wanted Sans";
          src: url("/fonts/wanted/WantedSans-ExtraBold.woff2") format("woff2");
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Wanted Sans";
          src: url("/fonts/wanted/WantedSans-Black.woff2") format("woff2");
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Wanted Sans";
          src: url("/fonts/wanted/WantedSans-ExtraBlack.woff2") format("woff2");
          font-weight: 950;
          font-style: normal;
          font-display: swap;
        }

        :root {
          --mk-bg: #efefec;
          --mk-panel: #f6f6f3;
          --mk-line: #b8b8b2;
          --mk-text: #171915;
          --mk-muted: #7f8379;
          --mk-accent: #df4f39;
          --mk-green: #557b37;
          --mk-shadow: 0 16px 40px rgba(18, 20, 18, 0.08);
          --mk-content-max: 1520px;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: "Wanted Sans", sans-serif;
          background: radial-gradient(circle at 20% 0%, #f4f4f2 0%, var(--mk-bg) 55%);
          color: var(--mk-text);
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        .mk-root {
          min-height: 100vh;
        }

        .mk-container {
          width: min(var(--mk-content-max), calc(100% - 72px));
          margin: 0 auto;
        }

        .mk-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          padding: 24px 0 10px;
        }

        .mk-links {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
        }

        .mk-link {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #222620;
          position: relative;
          text-decoration: none;
        }

        .mk-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.25s ease;
        }

        .mk-link:hover::after {
          width: 100%;
        }

        .mk-hero {
          text-align: center;
          padding: 68px 0 46px;
        }

        .mk-label {
          margin: 0;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: var(--mk-muted);
        }

        .mk-hero h1 {
          margin: 20px auto 0;
          max-width: 1040px;
          font-family: "Wanted Sans", sans-serif;
          font-size: clamp(48px, 4.8vw, 82px);
          line-height: 1.06;
          letter-spacing: -0.02em;
          font-weight: 500;
          word-break: keep-all;
          text-wrap: balance;
        }

        .mk-hero h1 span {
          display: block;
        }

        .mk-sub {
          margin: 22px auto 0;
          max-width: 780px;
          font-size: clamp(16px, 1.35vw, 22px);
          line-height: 1.74;
          color: #2f352d;
          word-break: keep-all;
          text-wrap: pretty;
        }

        .mk-profile {
          display: grid;
          grid-template-columns: minmax(280px, 360px) minmax(380px, 520px) minmax(280px, 360px);
          gap: 34px;
          align-items: center;
          justify-content: center;
          padding: 30px 0 84px;
        }

        .mk-profile > div:first-child,
        .mk-profile > div:last-child {
          padding-top: 0;
        }

        .mk-panel {
          background: color-mix(in srgb, var(--mk-panel) 86%, white 14%);
          border: 1px solid color-mix(in srgb, var(--mk-line) 62%, white 38%);
          border-radius: 22px;
          padding: 20px 18px;
          box-shadow: var(--mk-shadow);
        }

        .mk-panel + .mk-panel {
          margin-top: 16px;
        }

        .mk-panel-title {
          margin: 0 0 14px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7f8379;
        }

        .mk-panel p {
          margin: 0;
          font-size: 15px;
          line-height: 1.72;
          word-break: keep-all;
        }

        .mk-photo-stack {
          display: grid;
          gap: 18px;
          justify-items: center;
        }

        .mk-shell {
          width: min(460px, 100%);
          aspect-ratio: 0.86 / 1;
          border-radius: 240px 240px 126px 126px;
          border: 1.5px solid color-mix(in srgb, var(--mk-line) 72%, white 28%);
          background: linear-gradient(180deg, #f7f7f4 0%, #ecece7 100%);
          padding: 18px;
          position: relative;
          box-shadow: var(--mk-shadow);
        }

        .mk-shell::before {
          content: "";
          position: absolute;
          inset: -14px;
          border: 1px dashed color-mix(in srgb, var(--mk-line) 70%, white 30%);
          border-radius: inherit;
        }

        .mk-photo {
          width: 100%;
          height: 100%;
          border-radius: 220px 220px 112px 112px;
          overflow: hidden;
          background: #d7dde0;
        }

        .mk-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 8%;
          transform: scale(1.1);
          transform-origin: center top;
        }

        .mk-name {
          margin: 0;
          font-family: "Wanted Sans", sans-serif;
          font-size: clamp(36px, 4vw, 58px);
          font-weight: 500;
        }

        .mk-role {
          margin: 4px 0 0;
          font-size: 13px;
          font-weight: 700;
          color: #62695f;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-align: center;
        }

        .mk-stat-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 18px;
        }

        .mk-stat-item {
          border-bottom: 1px solid color-mix(in srgb, var(--mk-line) 60%, white 40%);
          padding-bottom: 14px;
        }

        .mk-stat-item:last-child {
          border-bottom: 0;
        }

        .mk-stat-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          color: #7f8379;
          margin-bottom: 8px;
          font-weight: 800;
        }

        .mk-stat-value {
          margin: 0;
          font-family: "Wanted Sans", sans-serif;
          font-size: clamp(52px, 4.4vw, 74px);
          line-height: 0.95;
          letter-spacing: -0.01em;
          font-weight: 500;
        }

        .mk-stat-spacer {
          display: inline-block;
          width: 0.24em;
        }

        .mk-stat-desc {
          margin: 8px 0 0;
          font-size: 13px;
          line-height: 1.55;
          color: #5f655b;
          word-break: keep-all;
        }

        .mk-line {
          height: 1px;
          width: 100%;
          background: color-mix(in srgb, var(--mk-line) 82%, white 18%);
        }

        .mk-section {
          padding: 88px 0 30px;
        }

        .mk-title {
          text-align: center;
          margin: 0 0 42px;
          font-family: "Wanted Sans", sans-serif;
          font-size: clamp(48px, 5vw, 74px);
          line-height: 1;
          font-weight: 500;
        }

        .mk-showreel {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .mk-show-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          border: 1px solid #d9dbd4;
        }

        .mk-show-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.08), transparent 45%);
        }

        .mk-show-item span {
          position: absolute;
          left: 12px;
          bottom: 11px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: white;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        }

        .mk-show-1 {
          background: linear-gradient(140deg, #a49a8f 0%, #c5bdb4 60%, #7f7368 100%);
        }

        .mk-show-2 {
          background: linear-gradient(145deg, #1c2026 0%, #4d535f 42%, #9fa0a5 100%);
        }

        .mk-show-3 {
          background: linear-gradient(145deg, #f1f3f8 0%, #d8ddeb 100%);
        }

        .mk-show-4 {
          background: linear-gradient(145deg, #b88e53 0%, #efc47d 100%);
        }

        .mk-show-5 {
          background: linear-gradient(145deg, #06080b 0%, #2f3947 100%);
        }

        .mk-project-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .mk-project-card {
          display: grid;
          gap: 12px;
          border: 1px solid #d9dbd4;
          border-radius: 14px;
          padding: 12px 12px 14px;
          background: #f7f8f4;
          box-shadow: var(--mk-shadow);
        }

        .mk-project-thumb {
          margin: 0;
          border-radius: 10px;
          border: 1px solid #d4d7ce;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #ecefe8;
        }

        .mk-project-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.35s ease;
        }

        .mk-project-card:hover .mk-project-thumb img {
          transform: scale(1.02);
        }

        .mk-project-thumb.fit-contain img {
          object-fit: contain;
          background: #f4f5f1;
        }

        .mk-project-tag {
          margin: 0;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #878d82;
          font-weight: 700;
        }

        .mk-project-title {
          margin: 2px 0 0;
          font-size: clamp(30px, 2.2vw, 40px);
          line-height: 1.14;
          font-family: "Wanted Sans", sans-serif;
          font-weight: 500;
          word-break: keep-all;
          text-wrap: balance;
        }

        .mk-project-copy {
          margin: 0;
          font-size: 15px;
          line-height: 1.66;
          color: #454b41;
          word-break: keep-all;
          text-wrap: pretty;
        }

        .mk-project-metric {
          margin: 2px 0 0;
          font-size: 13px;
          font-weight: 800;
          color: var(--mk-green);
        }

        .mk-project-actions {
          margin: 6px 0 0;
        }

        .mk-project-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid #ccd1c6;
          background: #f7f8f4;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #3f473d;
          text-decoration: none;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .mk-project-link:hover {
          background: #ecefe7;
          border-color: #aeb7a8;
          transform: translateY(-1px);
        }

        .mk-quote {
          margin: 82px auto 16px;
          max-width: 980px;
          text-align: center;
        }

        .mk-quote p {
          margin: 0;
          font-family: "Wanted Sans", sans-serif;
          font-size: clamp(38px, 4.4vw, 66px);
          line-height: 1.12;
          letter-spacing: -0.01em;
          font-weight: 500;
        }

        .mk-quote span {
          margin-top: 14px;
          display: inline-block;
          font-size: 13px;
          color: #646a60;
          font-weight: 700;
        }

        .mk-exp {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 56px;
          margin-top: 36px;
        }

        .mk-col {
          display: grid;
          gap: 18px;
        }

        .mk-year {
          margin: 0;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #9aa095;
        }

        .mk-item h3 {
          margin: 0;
          font-size: clamp(30px, 2.8vw, 42px);
          line-height: 1.05;
          font-family: "Wanted Sans", sans-serif;
          font-weight: 500;
        }

        .mk-item p {
          margin: 5px 0 0;
          font-size: 14px;
          line-height: 1.56;
          color: #60675d;
        }

        .mk-leverage {
          margin-top: 26px;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 34px;
          align-items: start;
        }

        .mk-leverage-copy {
          font-size: 15px;
          line-height: 1.72;
          color: #3c433b;
        }

        .mk-leverage-copy p {
          margin: 0;
        }

        .mk-leverage-copy ul {
          margin: 14px 0 0;
          padding: 0 0 0 16px;
        }

        .mk-leverage-copy li {
          margin: 0 0 8px;
        }

        .mk-bars {
          display: grid;
          gap: 14px;
        }

        .mk-bar-item {
          display: grid;
          gap: 7px;
        }

        .mk-bar-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .mk-bar-head span:first-child {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #72786d;
          font-weight: 800;
        }

        .mk-bar-head span:last-child {
          font-size: 14px;
          font-family: "Wanted Sans", sans-serif;
          font-weight: 500;
        }

        .mk-bar-track {
          width: 100%;
          height: 10px;
          border-radius: 999px;
          background: #dddfd8;
          overflow: hidden;
        }

        .mk-bar-fill {
          width: 0;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #5d8f3c 0%, #9fc85a 100%);
          transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mk-cta {
          text-align: center;
          padding: 70px 0 46px;
        }

        .mk-circle {
          margin: 0 auto;
          width: min(360px, 82vw);
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          border: 1.5px dotted #9d9f98;
          display: grid;
          place-items: center;
          background: radial-gradient(circle at 40% 35%, #fdfdfb 0%, #f0f0ed 72%);
          transition: transform 0.35s ease;
          text-decoration: none;
          color: inherit;
        }

        .mk-circle:hover {
          transform: translateY(-4px);
        }

        .mk-circle-label {
          margin: 0;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8b8f84;
        }

        .mk-circle-main {
          margin: 8px 0 0;
          font-family: "Wanted Sans", sans-serif;
          font-size: clamp(48px, 7vw, 72px);
          line-height: 0.9;
          color: var(--mk-accent);
          font-weight: 500;
        }

        .mk-circle-arrow {
          margin-top: 12px;
          font-size: 42px;
          line-height: 1;
        }

        .mk-footer {
          padding: 20px 0 40px;
        }

        .mk-footer-row {
          border-top: 1px solid color-mix(in srgb, var(--mk-line) 86%, white 14%);
          margin-top: 12px;
          padding-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: center;
        }

        .mk-footer-item {
          font-size: 12px;
          color: #555c53;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin: 0;
        }

        .mk-footer-item.center {
          text-align: center;
        }

        .mk-footer-item.right {
          text-align: right;
        }

        .mk-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mk-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 1140px) {
          .mk-container {
            width: min(var(--mk-content-max), calc(100% - 40px));
          }

          .mk-profile,
          .mk-project-grid,
          .mk-exp,
          .mk-leverage {
            grid-template-columns: 1fr;
          }

          .mk-profile {
            gap: 20px;
            justify-items: stretch;
            text-align: left;
          }

          .mk-profile > div:first-child,
          .mk-profile > div:last-child {
            padding-top: 0;
          }

          .mk-profile > div {
            width: min(640px, 100%);
            margin: 0 auto;
          }

          .mk-profile > div:nth-child(2) {
            order: 1;
            justify-self: center;
          }

          .mk-profile > div:nth-child(3) {
            order: 2;
          }

          .mk-profile > div:nth-child(1) {
            order: 3;
          }

          .mk-photo-stack {
            justify-items: center;
          }

          .mk-stat-list {
            width: 100%;
          }
        }

        @media (max-width: 760px) {
          .mk-container {
            width: min(var(--mk-content-max), calc(100% - 22px));
          }

          .mk-top-nav {
            padding-top: 18px;
          }

          .mk-links:last-child {
            display: none;
          }

          .mk-hero {
            padding-top: 30px;
          }

          .mk-hero h1 {
            font-size: clamp(38px, 11.6vw, 54px);
            line-height: 1.08;
          }

          .mk-sub {
            margin-top: 16px;
            font-size: 15px;
            line-height: 1.76;
          }

          .mk-panel p {
            font-size: 13px;
            line-height: 1.66;
          }

          .mk-shell {
            width: min(390px, 100%);
            padding: 14px;
          }

          .mk-stat-value {
            font-size: clamp(40px, 12vw, 56px);
          }

          .mk-project-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .mk-project-card {
            padding: 12px 12px 14px;
          }

          .mk-project-thumb {
            aspect-ratio: 4 / 3;
          }

          .mk-project-tag {
            font-size: 10px;
          }

          .mk-project-title {
            font-size: 30px;
          }

          .mk-project-copy {
            font-size: 14px;
          }

          .mk-project-link {
            font-size: 10px;
            letter-spacing: 0.04em;
            padding: 8px 10px;
          }

          .mk-showreel {
            grid-template-columns: repeat(2, 1fr);
          }

          .mk-show-item:last-child {
            grid-column: span 2;
            aspect-ratio: 2 / 1;
          }

          .mk-footer-row {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .mk-footer-item.center,
          .mk-footer-item.right {
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .mk-reveal,
          .mk-bar-fill,
          .mk-circle {
            transition: none;
          }
        }
      `}</style>

      <div className="mk-container">
        <header className="mk-top-nav mk-reveal">
          <nav className="mk-links" aria-label="메인 탐색">
            <a className="mk-link" href="#home">
              Home
            </a>
            <a className="mk-link" href="#projects">
              Projects
            </a>
            <a className="mk-link" href="#experience">
              Experience
            </a>
            <a className="mk-link" href="#contact">
              Contact
            </a>
          </nav>
          <nav className="mk-links">
            <a className="mk-link" href="mailto:mjk8410@naver.com">
              Email
            </a>
            <a className="mk-link" href="/docs/minji_resume.pdf" target="_blank" rel="noreferrer">
              Resume PDF
            </a>
            <a className="mk-link" href="/docs/minji_marketing_portfolio.pdf" target="_blank" rel="noreferrer">
              Portfolio PDF
            </a>
          </nav>
        </header>

        <section id="home" className="mk-hero mk-reveal">
          <p className="mk-label">Minji Kim · Marketing Resume 2026</p>
          <h1>
            <span>돈 쓰는 맛을 탐구하는</span>
            <span>마케터 김민지입니다.</span>
          </h1>
          <p className="mk-sub">
            치과·뷰티·F&B·커머스를 넘나들며 SEO, 광고, 바이럴, 상세페이지, 스마트스토어 세팅까지 한
            흐름으로 연결해온 실행형 마케터입니다.
          </p>
        </section>

        <section className="mk-profile mk-reveal">
          <div>
            <article className="mk-panel">
              <h2 className="mk-panel-title">Bio</h2>
              <p>
                조리학 전공에서 익힌 관능평가와 블라인드 테스트 경험을 마케팅 실무에 이식했습니다.
                감각이 아닌 데이터로 반응을 읽고, 실행 가능한 구조로 끝까지 연결합니다.
              </p>
            </article>
            <article className="mk-panel">
              <h2 className="mk-panel-title">Core Service</h2>
              <p>
                콘텐츠 기획 · 카피라이팅 · 네이버 검색광고 · 커뮤니티 바이럴 · 상세페이지 기획 ·
                스마트스토어 구축
              </p>
            </article>
          </div>

          <div className="mk-photo-stack">
            <div className="mk-shell">
              <figure className="mk-photo">
                <img id="mk-profile" src="/profile-photo.jpg" alt="마케터 김민지 증명사진" loading="eager" />
              </figure>
            </div>
            <p className="mk-name">Minji Kim</p>
            <p className="mk-role">Performance · Commerce · Viral · SEO</p>
          </div>

          <div>
            <ul className="mk-stat-list">
              <li className="mk-stat-item">
                <span className="mk-stat-label">Career</span>
                <p className="mk-stat-value">
                  <span data-count={3} data-suffix="년">
                    0년
                  </span>
                  <span className="mk-stat-spacer" aria-hidden="true" />
                  <span data-count={4} data-suffix="개월">
                    0개월
                  </span>
                </p>
                <p className="mk-stat-desc">마케팅 실무 경력(2022.09 - 현재)</p>
              </li>
              {stats.map((stat) => (
                <li className="mk-stat-item" key={stat.label}>
                  <span className="mk-stat-label">{stat.label}</span>
                  <p className="mk-stat-value">
                    <span
                      data-count={stat.value}
                      data-decimals={stat.decimals}
                      data-prefix={stat.prefix ?? ""}
                      data-suffix={stat.suffix ?? ""}
                    >
                      0
                    </span>
                  </p>
                  <p className="mk-stat-desc">{stat.desc}</p>
                </li>
              ))}
              <li className="mk-stat-item">
                <span className="mk-stat-label">멀티 프로젝트</span>
                <p className="mk-stat-value">
                  <span data-count={8}>0</span> / <span data-count={25}>0</span>
                </p>
                <p className="mk-stat-desc">최대 8개 병원 동시 운영 · 일 최대 25건</p>
              </li>
            </ul>
          </div>
        </section>

        <div className="mk-line" />

        <section className="mk-section mk-reveal">
          <h2 className="mk-title">@minji highlights</h2>
          <div className="mk-showreel">
            <article className="mk-show-item mk-show-1">
              <span>카피 테스트</span>
            </article>
            <article className="mk-show-item mk-show-2">
              <span>커머스 구조</span>
            </article>
            <article className="mk-show-item mk-show-3">
              <span>브랜드 제안</span>
            </article>
            <article className="mk-show-item mk-show-4">
              <span>로컬 SEO</span>
            </article>
            <article className="mk-show-item mk-show-5">
              <span>바이럴 운영</span>
            </article>
          </div>
        </section>

        <section id="projects" className="mk-section mk-reveal">
          <h2 className="mk-title">Latest Projects</h2>
          <div className="mk-project-grid">
            {projects.map((project) => (
              <article className="mk-project-card" key={project.title}>
                <figure className={`mk-project-thumb ${project.fit === "contain" ? "fit-contain" : ""}`}>
                  <img src={project.image} alt={`${project.title} 화면`} loading="lazy" />
                </figure>
                <p className="mk-project-tag">{project.tag}</p>
                <h3 className="mk-project-title">{project.title}</h3>
                <p className="mk-project-copy">{project.copy}</p>
                <p className="mk-project-metric">{project.metric}</p>
                {project.storeLink ? (
                  <p className="mk-project-actions">
                    <a className="mk-project-link" href={project.storeLink} target="_blank" rel="noreferrer">
                      {project.storeLabel}
                    </a>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mk-quote mk-reveal">
          <p>
            “기획만 잘하는 마케터가 아니라,
            <br />
            실행까지 끝내는 사람을 뽑고 싶다면
            <br />
            김민지는 매우 합리적인 선택입니다.”
          </p>
          <span>실무 중심 팀이 선호하는 타입의 마케터</span>
        </section>

        <div className="mk-line" />

        <section id="experience" className="mk-section mk-reveal">
          <h2 className="mk-title">Education & Experience</h2>
          <div className="mk-exp">
            <div className="mk-col">
              <p className="mk-year">Education</p>
              <article className="mk-item">
                <h3>한식조리학 전공</h3>
                <p>
                  관능평가·블라인드 테스트 경험을 통해 소비자 반응 분석의 기초를 익혔고, 이후 마케팅 실무에
                  적용했습니다.
                </p>
              </article>
              <article className="mk-item">
                <h3>Design Toolset</h3>
                <p>Photoshop · Illustrator · InDesign · Figma로 빠른 제작/협업이 가능합니다.</p>
              </article>
            </div>

            <div className="mk-col">
              <p className="mk-year">2022.09 — 2024.11</p>
              <article className="mk-item">
                <h3>지비비(주) / (주)위드앤코</h3>
                <p>웹디자인, 상세페이지/패키지, AMD 운영, 콘텐츠 배너 제작 실무.</p>
              </article>
              <article className="mk-item">
                <h3>(주)비디에스</h3>
                <p>치과·뷰티 브랜드 마케팅, 블로그/플레이스 SEO, 광고 운영 및 채널 최적화.</p>
              </article>
            </div>

            <div className="mk-col">
              <p className="mk-year">2025.02 — Present</p>
              <article className="mk-item">
                <h3>브라더스팩토리(주)</h3>
                <p>
                  당나발포차/강탄 광고 세팅·운영, 신규 제품 시장조사, 마스뚜르조 스마트스토어·상세페이지·체험단
                  운영.
                </p>
              </article>
              <article className="mk-item">
                <h3>(주)우리의이야기</h3>
                <p>
                  성형외과 바이럴 운영, 병원별 플랜/일정 관리, 온라인 커뮤니티 게시글 기획 및 업로드. 최대 8개
                  병원 동시 운영, 일 최대 25건 작업.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mk-section mk-reveal">
          <h2 className="mk-title">Why I Increase Team ROI</h2>
          <div className="mk-leverage">
            <div className="mk-leverage-copy">
              <p>
                저는 직무 경계를 넘나들며 실행 비용을 줄이는 타입입니다. 기획·카피·운영·디자인 협업을 한 사람이
                이어서 처리하면, 팀은 더 빠르게 검증하고 더 적은 리소스로 성과를 만듭니다.
              </p>
              <ul>
                <li>0 to 1 신규 구조 세팅 경험 (브랜드 런칭 준비)</li>
                <li>고관여 업종 다중 프로젝트 운영/조율</li>
                <li>성과 수치가 있는 퍼포먼스/SEO 실무 경험</li>
                <li>AI 보조 툴 기반 빠른 초안 제작 및 검증 루프</li>
              </ul>
            </div>
            <div className="mk-bars" id="mk-bars">
              {leverageBars.map((bar) => (
                <article className="mk-bar-item" key={bar.label}>
                  <div className="mk-bar-head">
                    <span>{bar.label}</span>
                    <span>{bar.value}</span>
                  </div>
                  <div className="mk-bar-track">
                    <div className="mk-bar-fill" data-width={bar.value} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mk-cta mk-reveal">
          <a className="mk-circle" href="mailto:mjk8410@naver.com" aria-label="김민지에게 메일 보내기">
            <div>
              <p className="mk-circle-label">Describe your project</p>
              <p className="mk-circle-main">
                Call
                <br />
                Minji
              </p>
              <p className="mk-circle-arrow">↗</p>
            </div>
          </a>
        </section>

        <footer className="mk-footer">
          <div className="mk-line" />
          <div className="mk-footer-row">
            <p className="mk-footer-item">© 2026 Minji Kim. All rights reserved.</p>
            <p className="mk-footer-item center">mjk8410@naver.com</p>
            <p className="mk-footer-item right">SEO · Performance · Viral · Commerce</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
