type Props = {
  style?: string;
};

const GlobalFooter = ({ style = '' }: Props) => {
  const styles = style + ' ' + 'px-4 py-6 sm:p-6 md:py-10 md:px-8';

  return (
    <footer className={styles}>
      <p className="text-start">&copy; 2023 Yui Shimamura</p>
    </footer>
  );
};

export default GlobalFooter;
