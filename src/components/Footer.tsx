'use client';

import Image from 'next/image';
import Link from 'next/link';
import { selectCategory } from '@/lib/categoryNav';
import styles from './Footer.module.css';

const footerLinks = {
  marketplace: [
    { label: 'Shop All Products', slug: null as string | null },
    { label: 'AgriProducts', slug: 'agricultural-products' },
    { label: 'Arts & Crafts', slug: 'arts-crafts' },
    { label: 'Tours & Travel', slug: 'tours-experiences' },
    { label: 'Shipping', slug: 'shipping-logistics' },
  ],
  account: [
    { label: 'Login', href: '/' },
    { label: 'Register', href: '/' },
  ],
  help: [
    { label: 'User Guides', href: '/' },
    { label: 'Policies & Legal', href: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.brand}>
              <Image
                src="/Africa-logo.jpg"
                alt="Africa Conglomerate Logo"
                width={52}
                height={52}
                className={styles.logo}
              />
              <div className={styles.brandName}>
                <span className={styles.brandMain}>Africa Conglomerate</span>
                <span className={styles.brandSub}>Marketplace</span>
              </div>
            </div>
            <p className={styles.tagline}>
              One platform for agriproducts, arts &amp; crafts, tours &amp; travel, and shipping across Africa.
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Marketplace</h4>
            <ul className={styles.linkList}>
              {footerLinks.marketplace.map((link) => (
                <li key={link.label}>
                  <Link
                    href="/"
                    className={styles.link}
                    onClick={() => selectCategory(link.slug)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Account</h4>
            <ul className={styles.linkList}>
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Help &amp; Legal</h4>
            <ul className={styles.linkList}>
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © 2022 - 2026 Africa Conglomerate Marketplace
        </p>
      </div>
    </footer>
  );
}
