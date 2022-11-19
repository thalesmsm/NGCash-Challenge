const Footer = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <p>&copy; Projeto criado por <a
          className="text-white/60 hover:text-white"
          href="https://www.linkedin.com/in/thalesmsm/"
          target="_blank" rel="noreferrer"
          >
           Thales
        </a> para teste técnico da <a
          className="text-white/60 hover:text-white"
          href="https://ng.cash/"
          target="_blank" rel="noreferrer"
          >
            NG.Cash
          </a>
      </p>
    </div>
  );
}

export default Footer;