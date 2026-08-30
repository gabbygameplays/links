import { motion } from 'motion/react'
import { fotoDe } from '../fotos'

const EASE = [0.2, 0.7, 0.3, 1]


export default function Pick({ item, i }) {
  const todo = item.why?.startsWith('TODO')
  const foto = item.photo ?? fotoDe(item.id)

  return (
    <motion.a
      className="pick"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay: 0.14 + Math.min(i, 6) * 0.06 }}
    >
      <span className={`frame${foto ? '' : ' frame--vazia'}`}>
        {foto ? (
          <img
            src={foto}
            alt={item.name}
            width="900"
            height="900"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="sem-foto">sem foto</span>
        )}
      </span>

      <span className="pick-body">
        <span className="pick-name">{item.name}</span>

        {item.rating && (
          <span className="pick-rating" aria-label={`Nota ${item.rating} de 5`}>
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
              <path
                d="M6 0.6l1.65 3.5 3.75.5-2.75 2.6.7 3.8L6 9.2 2.65 11l.7-3.8L.6 4.6l3.75-.5z"
                fill="currentColor"
              />
            </svg>
            {item.rating}
            {item.reviews && <span className="reviews">({item.reviews})</span>}
          </span>
        )}

        {item.price && (
          <span className="pick-price">
            {item.price}
            {item.was && <s className="was">{item.was}</s>}
          </span>
        )}

        {!todo && <span className="pick-why">{item.why}</span>}

        <span className="pick-cta">ver no {item.store}</span>
      </span>
    </motion.a>
  )
}
