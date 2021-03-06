interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'ldkmsvnfjgfnsrigjfkeadnsfgkjfeogiuikwejlfjnvkhjdnwve',
        user: {
          name: 'Matheus',
          email: 'matheus.ads.prog.18@gmail.com'
        },
      });
    }, 2000);
  });
}