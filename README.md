# BAPC_Website

This is the website for the Bay Area Programming Contest, hosted by Gunn Competitive Programming Club.

### Development
See the [Jekyll docs](https://jekyllrb.com/docs/step-by-step/01-setup/) for setup.
Once everything is installed, run `bundle exec jekyll serve` and check http://localhost:4000/ for the website.

### Photos
All the photos in the [/Photos](/Photos) directory are tracked with [Git LFS](https://git-lfs.com/) to avoid forcing
everyone to download several GB of photos when developing the website.

If you don't have Git LFS installed, the photos will not be downloaded locally.
To download them, [install Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage).

If you've already cloned the repository, run `git lfs fetch --all`.
Otherwise, clone the repository normally with `git clone git@github.com:Bay-Area-Programming-Contest/BAPC_Website.git`.

If you have Git LFS installed but do not want to download the Photos, run `GIT_LFS_SKIP_SMUDGE=1 git clone git@github.com:Bay-Area-Programming-Contest/BAPC_Website.git`.
