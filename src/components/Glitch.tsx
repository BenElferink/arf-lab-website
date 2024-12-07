import styles from '@/styles/Glitch.module.css';

const Glitch: (props: { children: string; color?: string; fontSize?: string }) => JSX.Element = ({
  children = 'React Glitch Text',
  color = 'whitesmoke',
  fontSize = '42px',
}) => {
  return (
    <p className={styles.glitchText} style={{ color, fontSize }}>
      <span aria-hidden='true'>{children}</span>
      {children}
      <span aria-hidden='true'>{children}</span>
    </p>
  );
};

export default Glitch;
