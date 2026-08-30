import { motion, useReducedMotion } from 'motion/react'
import Equalizer from './Equalizer'

const spring = { type: 'spring', stiffness: 260, damping: 22 }

export default function Profile({ profile, onShare }) {
  const still = useReducedMotion()

  return (
    <header>
      {/* avatar: entra com um "pop" e ganha um anel girando devagar (leitura de vinil) */}
      <motion.div
        className="avatar-slot"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...spring, delay: 0.05 }}
      >
        <motion.div
          className="avatar-ring"
          animate={still ? {} : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="avatar"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          transition={spring}
        >
          {profile.initial}
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.14 }}
      >
        {profile.name}
      </motion.h1>

      <motion.div
        className="handle"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.2 }}
      >
        <Equalizer color="var(--accent-2)" />
        {profile.handle}
      </motion.div>

      <motion.p
        className="bio"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.26 }}
      >
        {profile.bio}
      </motion.p>

      <motion.div
        className="social"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
      >
        {profile.socials.map((s) => (
          <motion.a
            key={s.label}
            href={s.url}
            aria-label={s.label}
            title={s.label}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { scale: 0.4, opacity: 0 },
              show: { scale: 1, opacity: 1 },
            }}
            transition={spring}
            whileHover={{ y: -3, scale: 1.06 }}
            whileTap={{ scale: 0.88 }}
          >
            {s.icon}
          </motion.a>
        ))}

        <motion.button
          type="button"
          className="social-btn"
          aria-label="Copiar link do perfil"
          title="Copiar link"
          onClick={onShare}
          variants={{
            hidden: { scale: 0.4, opacity: 0 },
            show: { scale: 1, opacity: 1 },
          }}
          transition={spring}
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ scale: 0.88 }}
        >
          🔗
        </motion.button>
      </motion.div>

      <Wave still={still} />
    </header>
  )
}

/** Onda sonora que se "desenha" na entrada. */
function Wave({ still }) {
  const d =
    'M0 13 Q 26 13 40 13 T 70 13 Q 84 2 98 13 T 126 13 Q 140 24 154 13 T 182 13 ' +
    'Q 196 5 210 13 T 238 13 Q 252 21 266 13 T 294 13 Q 308 3 322 13 T 350 13 ' +
    'Q 364 23 378 13 T 406 13 Q 420 7 434 13 T 462 13 Q 476 17 490 13 T 520 13'

  return (
    <svg className="wave" viewBox="0 0 520 26" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0" />
          <stop offset=".5" stopColor="#5eead4" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        initial={still ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
      />
    </svg>
  )
}
