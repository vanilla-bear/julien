# Unset HTML head link (Drupal 8.x)

If you want SEO boosting with Drupal 8.x site, we recomended to delete this HTML head links:

```html
<link rel="delete-form" href="/node/1/delete" />
<link rel="edit-form" href="/node/1/edit" />
<link rel="version-history" href="/node/1/revisions" />
<link rel="revision" href="/page-1-name" />
```
Our module ``Unset HTML head link`` can do it. Fast and simply!

Support:

* Node
* Taxonomy term

## Install

* Download [ZIP with module](https://github.com/enjoyiacm/unset_html_head_link/archive/master.zip), unpack and upload to ``./modules/`` folder in your server.
* Enable this module at ``/admin/modules`` (look in ``Search engine optimization`` pack).
* _Don't forget to flush cache!_
