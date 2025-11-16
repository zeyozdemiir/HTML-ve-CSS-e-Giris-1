import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { isPropertySetInCss } from './utility.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('CSS dosyası sayfaya eklenmiş mi?', () => {
    const cssLinkTag = dom.window.document.head.querySelector(
      'link[href*="index.css"]'
    );
    expect(cssLinkTag).toBeInTheDocument();
  });

  it('Sayfanın head bölümüne Türkçe karakterleri destekleyecek karakter seti için meta tag eklenmiş mi?', () => {
    const cssMetaTag = dom.window.document.head.querySelector(
      'meta[charset="UTF-8"]'
    );
    expect(cssMetaTag).toBeInTheDocument();
  });

  it("Sayfanın head bölümüne başlık ve 'Food El Blog' eklenmiş eklenmiş mi?", () => {
    const csstitleTag = dom.window.document.head.querySelector('title');
    expect(csstitleTag).toBeInTheDocument();
    expect(csstitleTag.textContent).toBe('Food El Blog');
  });

  it('header bölümü eklenmiş mi?', () => {
    const element = container.querySelector('header');
    expect(element).toBeInTheDocument();
  });

  it('header bölümüne kurum adı (Food El Blog) yazısı doğru tag ile eklenmiş mi?', () => {
    const element = container.querySelector('header h1');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Food El Blog');
  });

  it('header bölümüne navigasyon menüsü eklenmiş mi?', () => {
    const element = container.querySelector('header nav');
    expect(element).toBeInTheDocument();
  });

  it("navigasyon bölümü'nde 6 adet link eklenmiş", () => {
    const element = container.querySelectorAll('header nav a');
    expect(element.length).toBe(6);
  });

  it("navigasyon bölümü'nde 6 adet link doğru metinler ve sıralama ile eklenmiş mi?", () => {
    const element = container.querySelectorAll('header nav a');
    expect(element.length).toBe(6);
    expect(element[0].textContent).toBe('Ana Sayfa');
    expect(element[1].textContent).toBe('Aperatifler');
    expect(element[2].textContent).toBe('Vegan');
    expect(element[3].textContent).toBe('Yemekler');
    expect(element[4].textContent).toBe('Tatlılar');
    expect(element[5].textContent).toBe('İçecekler');
  });

  it('Banner resmi eklenmiş eklenmiş mi?', () => {
    const element = container.querySelector('img[src*="banner.jpg"]');
    expect(element).toBeInTheDocument();
  });

  it('Hakkımızda başlığı doğru tag ile eklenmiş mi?', () => {
    const element = container.querySelector('.hakkimizda-section h2');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Hakkımızda');
  });

  it('Hakkımızda bölümündeki yazı doğru tag ile eklenmiş mi?', () => {
    const element = container.querySelector('.hakkimizda-section p');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toMatch(/Yaygınlaşmış küresel gıda/i);
  });

  it('Yemekler başlığı doğru tag ile eklenmiş mi?', () => {
    const element = container.querySelector('.yemekler-section h2');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Yemekler');
  });

  it('Yemekler resmi eklenmiş mi?', () => {
    const element = container.querySelector('img[src*="yemek.jpg"]');
    expect(element).toBeInTheDocument();
  });

  it('Yemekler bölümünde 2 paragraf yazı eklenmiş mi?', () => {
    const element = container.querySelectorAll('.yemekler-section p');
    expect(element[0]).toBeInTheDocument();
    expect(element[0].textContent).toMatch(/Bir fırında mantar soslu/i);
    expect(element[1].textContent).toMatch(/Bu yemek için dana antrikot özel/i);
  });

  it('Aperatif başlığı doğru tag ile eklenmiş mi?', () => {
    const element = container.querySelector('.aperatif-section h2');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Aperatif');
  });

  it('Aperatif resmi eklenmiş mi?', () => {
    const element = container.querySelector('img[src*="aperatif.jpg"]');
    expect(element).toBeInTheDocument();
  });

  it('Aperatif bölümünde 2 paragraf yazı eklenmiş mi?', () => {
    const element = container.querySelectorAll('.aperatif-section p');
    expect(element[0]).toBeInTheDocument();
    expect(element[0].textContent).toMatch(/Anadolu lezzetlerinden Avrupa/i);
    expect(element[1].textContent).toMatch(/Yine de en çok sizleri bize /i);
  });

  it('Tatlılar başlığı doğru tag ile eklenmiş mi?', () => {
    const element = container.querySelector('.tatlilar-section h2');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Tatlılar');
  });

  it('Tatlılar resmi eklenmiş mi?', () => {
    const element = container.querySelector('img[src*="tatli.jpg"]');
    expect(element).toBeInTheDocument();
  });

  it('Tatlılar bölümünde yazı eklenmiş mi?', () => {
    const element = container.querySelectorAll('.tatlilar-section p');
    expect(element[0]).toBeInTheDocument();
    expect(element[0].textContent).toMatch(/Taptaze tatlılarımız/i);
  });

  it('İletişim başlığı doğru tag ile eklenmiş mi?', () => {
    const element = container.querySelector('.iletisim-section h2');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('İletişim');
  });

  it("İletişim bölümünde listeleme tag'i kullanılmış mı?", () => {
    const element = container.querySelector('.address ul');
    const element2 = container.querySelector('.address ol');
    expect(element || element2).toBeTruthy();
  });

  it('İletişim bölümünde yazı eklenmiş mi?', () => {
    const element = container.querySelectorAll('.address li');
    expect(element[0]).toBeInTheDocument();
});

  it('Footer bölümü eklenmiş mi?', () => {
    const element = container.querySelector('footer');
    expect(element).toBeInTheDocument();
  });

  it("Footer'da navigasyon bölümü doğru tag ile eklenmiş mi?", () => {
    const element = container.querySelector('footer nav');
    expect(element).toBeTruthy();
  });

  it("Footer'da copyright yazısı doğru tag, class ve metin ile eklenmiş mi?", () => {
    const element = container.querySelector('footer p.copyright');
    expect(element).toBeInTheDocument();
  });

  it('css-1 universal selector ile yazı rengini #3c373b yapılmış mı?', () => {
    expect(isPropertySetInCss(css, '*', 'color', '#3c373b')).toBe(true);
  });

  it('css-2 h1 için font büyüklüğü ve yazının hizası doğru ayarlanmış mı?', () => {
    expect(isPropertySetInCss(css, 'h1', 'font-size', '60px')).toBe(true);
    expect(isPropertySetInCss(css, 'h1', 'text-align', 'center')).toBe(true);
  });

  it('css-3 h2 için yazı karakteri büyüklüğü ve resimlerin clear her 2 taraf için de ayarı doğru yapılmış mı?', () => {
    expect(isPropertySetInCss(css, 'h2,h3,h4,h5,h6', 'font-size', '30px')).toBe(
      true
    );
    expect(isPropertySetInCss(css, 'h2,h3,h4,h5,h6', 'clear', 'both')).toBe(
      true
    );
  });

  it('css-4 tüm paragraflar için istenen 5 ayar da doğru ayarlanmış mı?', () => {
    expect(isPropertySetInCss(css, 'p', 'font-size', '16px')).toBe(true);
    expect(isPropertySetInCss(css, 'p', 'font-family', 'Roboto')).toBe(true);
    expect(isPropertySetInCss(css, 'p', 'padding', '10px')).toBe(true);
    expect(
      isPropertySetInCss(css, 'p', 'line-height', '140%') ||
        isPropertySetInCss(css, 'p', 'line-height', '1.4')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, 'p', 'margin', '0') ||
        isPropertySetInCss(css, 'p', 'margin', '0px')
    ).toBe(true);
  });

  it("css-5 image'lar için kenarlar yuvarlatışmış ve genişlik doğru ayarlanmış mı?", () => {
    expect(isPropertySetInCss(css, 'img', 'border-radius', '10px')).toBe(true);
    expect(isPropertySetInCss(css, 'img', 'width', '100%')).toBe(true);
  });

  it('css-6 ul için istenen 4 kural da doğru ayarlanmış mı?', () => {
    expect(
      isPropertySetInCss(css, 'ul', 'margin', '0 10px') ||
        isPropertySetInCss(css, 'ul', 'margin', '0px 10px')
    ).toBe(true);
    expect(isPropertySetInCss(css, 'ul', 'list-style-type', 'none')).toBe(true);
    expect(
      isPropertySetInCss(css, 'ul', 'padding', '0') ||
        isPropertySetInCss(css, 'ul', 'padding', '0px')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, 'ul', 'line-height', '150%') ||
        isPropertySetInCss(css, 'ul', 'line-height', '1.5')
    ).toBe(true);
  });

  it('css-7 left-img için sağında metin ile arasına boşluk eklenmiş ve sola yaslanması sağlanmış mı?', () => {
    expect(
      isPropertySetInCss(css, '.left-imgimg', 'margin-right', '20px')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.left-imgimg', 'float', 'left')).toBe(true);
  });

  it('css-8 right-img için solunda metin ile arasına boşluk eklenmiş ve sağa yaslanması sağlanmış mı?', () => {
    expect(
      isPropertySetInCss(css, '.right-imgimg', 'margin-left', '20px')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.right-imgimg', 'float', 'right')).toBe(
      true
    );
  });

  it("css-9 container class'ı için istenen 3 kural da ayarlanmış mı?", () => {
    expect(isPropertySetInCss(css, '.container', 'width', '750px')).toBe(true);
    expect(isPropertySetInCss(css, '.container', 'margin', '0 auto')).toBe(
      true
    );
    expect(isPropertySetInCss(css, '.container', 'display', 'block')).toBe(
      true
    );
  });

  it('css-10 header nav a için arkaplan rengi ve yazının hizası ayarlanmış mı?', () => {
    expect(
      isPropertySetInCss(css, 'headernava', 'background', '#e79947') ||
        isPropertySetInCss(css, 'headernava', 'background-color', '#e79947')
    ).toBe(true);
    expect(isPropertySetInCss(css, 'headernava', 'text-align', 'center')).toBe(
      true
    );
  });

  it("css-11 iletisim-section class'ı için aşağı kenarlık ayarlanmış mı?", () => {
    expect(
      isPropertySetInCss(
        css,
        '.iletisim-section',
        'border-bottom',
        '1px dashed black'
      ) ||
        isPropertySetInCss(
          css,
          '.iletisim-section',
          'border-bottom',
          '1px dashed #000000'
        )
    ).toBe(true);
  });
});
