import styles from './buttons.module.scss'
import clsx from 'clsx'

function Button({ className, primary, ...props }) {
  return (
    <button type='button'
      className={clsx(
        styles.button,
        className,
        primary && styles.button_primary
      )}
      {...props} />

  )
}

export { Button as default, Button }
