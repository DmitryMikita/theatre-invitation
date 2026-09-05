/* oxlint-disable next/no-img-element -- Static Vite site; QR must preserve original image pixels. */
import { useRef, useState } from 'react';
import { Volume2, VolumeX, ArrowUpRight, RotateCcw, Sparkles, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playApplause } from './sound';

// Relative path to the real QR image when it arrives, e.g. './ticket-qr.png'.
const TICKET_QR: string = '';
export default function Home() {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [muted, setMuted] = useState(false);
  const stopAudio = useRef<(() => void) | null>(null);
  const ticket = useRef<HTMLButtonElement>(null);
  const [qrFailed, setQrFailed] = useState(false);
  function reveal() {
    setOpen(true);
    if (!muted) { try { stopAudio.current = playApplause(); } catch { /* Invitation works without audio. */ } }
    window.setTimeout(() => ticket.current?.focus({ preventScroll: true }), 1800);
  }
  function toggleSound() { if (!muted) stopAudio.current?.(); setMuted(!muted); }
  return (
    <main className={`theatre ${open ? 'is-open' : ''}`}>
      <div className="scene" aria-hidden="true" /><div className="shade" aria-hidden="true" />
      <div className="curtain curtain-left" aria-hidden="true" /><div className="curtain curtain-right" aria-hidden="true" /><div className="proscenium" aria-hidden="true" />
      <header className="masthead"><span className="brand"><Sparkles size={18} strokeWidth={1} /> ВЕЧЕР ДЛЯ ДВОИХ</span>
        <Button className="sound-control" variant="ghost" onClick={toggleSound} aria-label={muted ? 'Включить звук' : 'Выключить звук'} aria-pressed={!muted}>{muted ? <VolumeX /> : <Volume2 />}<span>Звук {muted ? 'выкл.' : 'вкл.'}</span></Button>
      </header>
      {!open && <section className="overture" aria-labelledby="opening-title">
        <span className="eyebrow">ОДНО ПРИГЛАШЕНИЕ. ОСОБЕННЫЙ ВЕЧЕР.</span>
        <div className="ornament" aria-hidden="true"><i />✧<i /></div>
        <h1 id="opening-title">Всё начинается<br />с <em>аплодисментов</em></h1>
        <p>За этим занавесом кое-что для тебя.</p>
        <Button className="applause-button" onClick={reveal}><Hand size={20} strokeWidth={1.4} /> Поаплодировать <ArrowUpRight size={18} /></Button>
        <span className="whisper">Нажми — и пусть вечер начнётся</span>
      </section>}
      <section className="invitation" aria-label="Приглашение для Маши" aria-hidden={!open} inert={!open}>
        <p className="sr-only" id="invitation-summary">Маша, приглашаю тебя на свидание. Орган и скрипка при свечах. 3 октября в 18:00. Органный концертный зал КазНУИ, Женис, 33.</p>
        <p className="eyebrow invitation-caption">ЭТОТ ВЕЧЕР — ДЛЯ ТЕБЯ</p>
        <button ref={ticket} type="button" className={`ticket ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped(!flipped)} aria-describedby="invitation-summary" aria-label={flipped ? 'Показать приглашение' : 'Перевернуть билет и посмотреть QR'} aria-pressed={flipped}>
          <span className="ticket-rotator">
            <span className="ticket-face ticket-front" aria-hidden={flipped}>
              <span className="ticket-main">
                <span className="ticket-topline"><span>ЛИЧНОЕ ПРИГЛАШЕНИЕ</span><span>№ 0310</span></span>
                <span className="dedication">Маша,</span><span className="ticket-heading">приглашаю тебя<br />на <em>свидание.</em></span>
                <span className="ticket-message">Пусть этот вечер звучит только для нас.</span>
                <span className="programme">Орган <b>·</b> Скрипка <b>·</b> При свечах</span>
                <span className="ticket-details"><span><small>КОГДА</small><strong>3 октября · 18:00</strong></span><span><small>ГДЕ</small><strong>Органный концертный зал КазНУИ</strong><span>Женис, 33</span></span></span>
                <span className="ticket-bottom"><span>С предвкушением нашей встречи</span><span>↻ Переверни билет</span></span>
              </span>
              <span className="ticket-stub"><span className="stub-title">ПРИГЛАШЕНИЕ НА СВИДАНИЕ</span><span className="stub-date">03<span>ОКТЯБРЯ</span></span><span className="stub-time">18:00</span><span className="stub-flower">✧</span><span className="stub-name">Для Маши</span><span className="stub-number">№ 0310 / ♥</span></span>
            </span>
            <span className="ticket-face ticket-back" aria-hidden={!flipped}>
              <span className="eyebrow">ТВОЙ БИЛЕТ В ПРЕКРАСНЫЙ ВЕЧЕР</span><span className="back-heading">До встречи, Маша</span>
              {TICKET_QR && !qrFailed ? <img className="ticket-qr" src={TICKET_QR} alt="QR-код входного билета" onError={() => setQrFailed(true)} /> : <span className="qr-placeholder"><span aria-hidden="true">✧</span><strong>Билет скоро появится</strong><span>А наш вечер уже запланирован</span></span>}
              <span className="back-details">3 октября · 18:00<br />Органный концертный зал КазНУИ · Женис, 33</span><span className="flip-hint">↻ Вернуться к приглашению</span>
            </span>
          </span>
        </button>
        <p className="afterword">Музыка. Тёплый свет. И мы.</p>
        <Button variant="ghost" className="replay" onClick={() => { stopAudio.current?.(); setOpen(false); setFlipped(false); }}><RotateCcw size={14} /> Ещё раз с начала</Button>
      </section>
      <footer><span>ОРГАН & СКРИПКА ПРИ СВЕЧАХ</span><span>03 / 10 <i /> 18:00</span></footer>
    </main>
  );
}
