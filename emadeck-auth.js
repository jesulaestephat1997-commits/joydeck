/* Emadeck - connexion Supabase (comptes). La cle ci-dessous est publique (publishable). */
(function(){
  var URL = 'https://gdbcijmnffmktjeumgxu.supabase.co';
  var KEY = 'sb_publishable_GikVjtr1zRKql1FIG3NbIw_KbZTA6SA';
  if (!window.supabase) return;
  var sb = window.supabase.createClient(URL, KEY);
  window.emadeckSB = sb;
  function msg(e){
    var m = (e && e.message) || '';
    if (/already registered|already been registered/i.test(m)) return 'An account with this email already exists. Please log in.';
    if (/invalid login credentials/i.test(m)) return 'Incorrect email or password.';
    if (/password/i.test(m) && /(weak|short|least)/i.test(m)) return 'Please choose a stronger password (at least 8 characters).';
    if (/rate limit|too many/i.test(m)) return 'Too many attempts. Please wait a moment and try again.';
    if (/email.*(invalid|not valid)/i.test(m)) return 'Please enter a valid email address.';
    if (/network|fetch/i.test(m)) return 'Connection problem. Check your internet and try again.';
    return m || 'Something went wrong. Please try again.';
  }
  window.EMADECK_AUTH = {
    signUp: function(d){
      return sb.auth.signUp({
        email: d.email, password: d.pass,
        options: { data: { first_name: d.first, last_name: d.last, phone: d.phoneCode + ' ' + d.phone, country: d.country } }
      }).then(function(r){
        if (r.error) throw new Error(msg(r.error));
        var u = r.data && r.data.user;
        if (u && u.identities && u.identities.length === 0) throw new Error('An account with this email already exists. Please log in.');
        return r.data;
      });
    },
    signIn: function(d){
      return sb.auth.signInWithPassword({ email: d.email, password: d.pass }).then(function(r){
        if (r.error) throw new Error(msg(r.error));
        return r.data;
      });
    },
    signOut: function(){ return sb.auth.signOut(); },
    session: function(){ return sb.auth.getSession().then(function(r){ return r.data && r.data.session; }); }
  };
  /* deja connecte : on ouvre directement le builder */
  sb.auth.getSession().then(function(r){
    if (r.data && r.data.session && /(login|signup)\.html$/i.test(location.pathname)) location.replace('builder.html');
  });
})();
