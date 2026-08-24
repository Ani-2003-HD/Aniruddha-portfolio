import { motion } from 'framer-motion';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { riseIn, stagger, viewportOnce, maskUp, EASE } from '../lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

/** Single element rising into view. */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={riseIn}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers direct <RevealItem> children. */
export function RevealGroup({
  children,
  className = '',
  delay = 0,
  gap = 0.08,
  style,
}: RevealProps & { gap?: number }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={stagger(delay, gap)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = '' }: RevealProps) {
  return (
    <motion.div className={className} variants={riseIn}>
      {children}
    </motion.div>
  );
}

/**
 * Wipes a heading up from behind its own mask, word by word.
 *
 * Splitting on words rather than characters is deliberate: per-character
 * masking on a long heading produces dozens of nodes and reads as a gimmick,
 * while per-word keeps the line legible the whole way through the animation.
 *
 * The `fill` class (the chrome gradient) is applied to each animated word
 * rather than to the heading, and that placement is load-bearing rather than
 * stylistic. `background-clip: text` is defeated by ANY transform on a
 * descendant — including the `translateY(0%)` the animation settles on —
 * because a transformed element paints into its own layer and is never
 * clipped by an ancestor's background. Put the gradient on the heading and
 * every word renders `color: transparent`, i.e. invisible. Put it on the
 * element that actually moves and it renders correctly throughout.
 */
export function MaskedText({
  text,
  className = '',
  fill = 'text-chrome',
  delay = 0,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  fill?: string;
  delay?: number;
  as?: ElementType;
}) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={stagger(delay, 0.055)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
          >
            <motion.span className={`inline-block ${fill}`} variants={maskUp}>
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** A hairline rule that draws itself outward from the left as it enters. */
export function DrawLine({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`hairline origin-left ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}
