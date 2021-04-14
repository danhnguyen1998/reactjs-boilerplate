import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

ClassicEditor.create(document.querySelector('#editor'), {
  plugins: [Alignment], // <--- MODIFIED
  toolbar: ['bold', 'italic', 'alignment'],
})
  .then((editor) => {
    console.log('TODO', editor);
  })
  .catch((error) => {
    console.error(error.stack);
  });
