module.exports = {
   format_date: (date) => {
     return new Intl.DateTimeFormat('en-US', {
       dateStyle: 'medium',
       timeStyle: 'medium'
     }).format(date);
   },
};