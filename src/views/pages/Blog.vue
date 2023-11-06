<template>
    <div>
        <!-- Begin Li's Breadcrumb Area -->
        <div class="breadcrumb-area">
            <div class="container">
                <div class="breadcrumb-content">
                    <ul>
                        <li><router-link :to="{name: 'home'}">Home</router-link></li>
                        <li class="active">Blog</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Li's Breadcrumb Area End Here -->
        <!-- Begin Li's Main Blog Page Area -->
        <div class="li-main-blog-page pt-60 pb-55">
            <div class="container">
                <div class="row">
                    <!-- Begin Li's Main Content Area -->
                    <div class="col-lg-12">
                        <div class="row li-main-content">
                            <div class="col-lg-4 col-md-6">
                                <div class="li-blog-single-item pb-25">
                                    <div class="li-blog-banner">
                                        <router-link :to="{name: 'blog-details'}"><img class="img-full" src="@/assets/images/blog-banner/2.jpg" alt=""></router-link>>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details">
                                            <h3 class="li-blog-heading pt-25"><router-link :to="{name: 'blog-details'}">blog image post</router-link></h3>
                                            <div class="li-blog-meta">
                                                <a class="author" href="#"><i class="fa fa-user"></i>Admin</a>
                                                <a class="comment" href="#"><i class="fa fa-comment-o"></i> 3 comment</a>
                                                <a class="post-time" href="#"><i class="fa fa-calendar"></i> 25 nov 2018</a>
                                            </div>
                                            <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                                            <router-link class="read-more" :to="{name: 'blog-details'}">Read More...</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="li-blog-single-item pb-25">
                                    <div class="li-blog-banner">
                                        <router-link :to="{name: 'blog-details'}"><img class="img-full" src="@/assets/images/blog-banner/2.jpg" alt=""></router-link>>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details">
                                            <h3 class="li-blog-heading pt-25"><router-link :to="{name: 'blog-details'}">blog image post</router-link></h3>
                                            <div class="li-blog-meta">
                                                <a class="author" href="#"><i class="fa fa-user"></i>Admin</a>
                                                <a class="comment" href="#"><i class="fa fa-comment-o"></i> 3 comment</a>
                                                <a class="post-time" href="#"><i class="fa fa-calendar"></i> 25 nov 2018</a>
                                            </div>
                                            <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                                            <router-link class="read-more" :to="{name: 'blog-details'}">Read More...</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="li-blog-single-item pb-25">
                                    <div class="li-blog-banner embed-responsive embed-responsive-16by9">
                                        <iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/300107209&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details">
                                            <h3 class="li-blog-heading pt-25"><router-link :to="{name: 'blog-details'}">blog audio post</router-link></h3>
                                            <div class="li-blog-meta">
                                                <a class="author" href="#"><i class="fa fa-user"></i>Admin</a>
                                                <a class="comment" href="#"><i class="fa fa-comment-o"></i> 3 comment</a>
                                                <a class="post-time" href="#"><i class="fa fa-calendar"></i> 25 nov 2018</a>
                                            </div>
                                            <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                                            <router-link class="read-more" :to="{name: 'blog-details'}">Read More...</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="li-blog-single-item pb-25">
                                    <div class="li-blog-banner embed-responsive embed-responsive-16by9">
                                        <iframe src="https://www.youtube.com/embed/DR2c266yWEA" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details">
                                            <h3 class="li-blog-heading pt-25"><router-link :to="{name: 'blog-details'}">blog video post</router-link></h3>
                                            <div class="li-blog-meta">
                                                <a class="author" href="#"><i class="fa fa-user"></i>Admin</a>
                                                <a class="comment" href="#"><i class="fa fa-comment-o"></i> 3 comment</a>
                                                <a class="post-time" href="#"><i class="fa fa-calendar"></i> 25 nov 2018</a>
                                            </div>
                                            <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                                            <router-link class="read-more" :to="{name: 'blog-details'}">Read More...</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="li-blog-single-item pb-25">
                                    <div class="li-blog-banner">
                                        <router-link :to="{name: 'blog-details'}"><img class="img-full" src="@/assets/images/blog-banner/5.jpg" alt=""></router-link>>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details">
                                            <h3 class="li-blog-heading pt-25"><router-link :to="{name: 'blog-details'}">blog fifth post</router-link></h3>
                                            <div class="li-blog-meta">
                                                <a class="author" href="#"><i class="fa fa-user"></i>Admin</a>
                                                <a class="comment" href="#"><i class="fa fa-comment-o"></i> 3 comment</a>
                                                <a class="post-time" href="#"><i class="fa fa-calendar"></i> 25 nov 2018</a>
                                            </div>
                                            <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                                            <router-link class="read-more" :to="{name: 'blog-details'}">Read More...</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="li-blog-single-item pb-25">
                                    <div class="li-blog-banner">
                                        <router-link :to="{name: 'blog-details'}"><img class="img-full" src="@/assets/images/blog-banner/6.jpg" alt=""></router-link>>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details">
                                            <h3 class="li-blog-heading pt-25"><router-link :to="{name: 'blog-details'}">blog second post</router-link></h3>
                                            <div class="li-blog-meta">
                                                <a class="author" href="#"><i class="fa fa-user"></i>Admin</a>
                                                <a class="comment" href="#"><i class="fa fa-comment-o"></i> 3 comment</a>
                                                <a class="post-time" href="#"><i class="fa fa-calendar"></i> 25 nov 2018</a>
                                            </div>
                                            <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                                            <router-link class="read-more" :to="{name: 'blog-details'}">Read More...</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="li-blog-single-item pb-25">
                                    <div class="li-blog-banner">
                                        <router-link :to="{name: 'blog-details'}"><img class="img-full" src="@/assets/images/blog-banner/6.jpg" alt=""></router-link>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details">
                                            <h3 class="li-blog-heading pt-25"><router-link :to="{name: 'blog-details'}">blog second post</router-link></h3>
                                            <div class="li-blog-meta">
                                                <a class="author" href="#"><i class="fa fa-user"></i>Admin</a>
                                                <a class="comment" href="#"><i class="fa fa-comment-o"></i> 3 comment</a>
                                                <a class="post-time" href="#"><i class="fa fa-calendar"></i> 25 nov 2018</a>
                                            </div>
                                            <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                                            <router-link class="read-more" :to="{name: 'blog-details'}">Read More...</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="li-blog-single-item pb-25">
                                    <div class="li-blog-banner">
                                        <router-link :to="{name: 'blog-details'}"><img class="img-full" src="@/assets/images/blog-banner/6.jpg" alt=""></router-link>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details">
                                            <h3 class="li-blog-heading pt-25"><router-link :to="{name: 'blog-details'}">blog second post</router-link></h3>
                                            <div class="li-blog-meta">
                                                <a class="author" href="#"><i class="fa fa-user"></i>Admin</a>
                                                <a class="comment" href="#"><i class="fa fa-comment-o"></i> 3 comment</a>
                                                <a class="post-time" href="#"><i class="fa fa-calendar"></i> 25 nov 2018</a>
                                            </div>
                                            <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                                            <router-link class="read-more" :to="{name: 'blog-details'}">Read More...</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="li-blog-single-item pb-25">
                                    <div class="li-blog-banner">
                                        <router-link :to="{name: 'blog-details'}"><img class="img-full" src="@/assets/images/blog-banner/6.jpg" alt=""></router-link>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details">
                                            <h3 class="li-blog-heading pt-25"><router-link :to="{name: 'blog-details'}">blog second post</router-link></h3>
                                            <div class="li-blog-meta">
                                                <a class="author" href="#"><i class="fa fa-user"></i>Admin</a>
                                                <a class="comment" href="#"><i class="fa fa-comment-o"></i> 3 comment</a>
                                                <a class="post-time" href="#"><i class="fa fa-calendar"></i> 25 nov 2018</a>
                                            </div>
                                            <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                                            <router-link class="read-more" :to="{name: 'blog-details'}">Read More...</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Begin Li's Pagination Area -->
                            <div class="col-lg-12">
                                <div class="li-paginatoin-area text-center pt-25">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <ul class="li-pagination-box">
                                                <li><a class="Previous" href="#">Previous</a></li>
                                                <li class="active"><a href="#">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a class="Next" href="#">Next</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Li's Pagination End Here Area -->
                        </div>
                    </div>
                    <!-- Li's Main Content Area End Here -->
                </div>
            </div>
        </div>
        <!-- Li's Main Blog Page Area End Here -->
    </div>
</template>
<script>

</script>
<style lang="">
    
</style>