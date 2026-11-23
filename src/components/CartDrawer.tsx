'use client';

import { useEffect, useState } from 'react';
import { getCart, getCartTotal, removeFromCart, type CartItem } from '@/lib/cart';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  topOffset: number;
}

export default function CartDrawer({ open, onClose, topOffset }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showCheckoutMsg, setShowCheckoutMsg] = useState(false);

  const refresh = () => setItems(getCart());

  useEffect(() => {
    if (open) {
      refresh();
      setShowCheckoutMsg(false);
    }
  }, [open]);

  useEffect(() => {
    window.addEventListener('cart-updated', refresh);
    return () => window.removeEventListener('cart-updated', refresh);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const total = getCartTotal();

  return (
    <>
      <div
        className={styles.overlay}
        style={{ top: topOffset }}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={styles.drawer}
        style={{ top: topOffset, height: `calc(100dvh - ${topOffset}px)` }}
        aria-label="Shopping cart"
      >
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>
            Your Cart
            {items.length > 0 && <span className={styles.itemCount}>{items.length}</span>}
          </h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close cart">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className={styles.emptyText}>Your cart is empty</p>
              <p className={styles.emptySub}>Add products to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImage}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} width={56} height={56} />
                  ) : (
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  )}
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemMeta}>
                    Qty: {item.quantity} &middot; ${item.price.toFixed(2)} each
                  </p>
                  <p className={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalValue}>${total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton} onClick={() => setShowCheckoutMsg(true)}>
              Checkout
            </button>
            {showCheckoutMsg && (
              <p className={styles.checkoutMsg}>Checkout is coming soon.</p>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
