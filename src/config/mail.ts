type ImailConfig = {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
};

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'email@seudominio.com',
      name: 'Seu nome',
    },
  },
} as ImailConfig;
