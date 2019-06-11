<?php get_header(); ?>


<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
        <h1>
            <?php the_title() ?>
        </h1>
        <p>
            <?php the_content() ?>
            </div>
            <div class="link">
                <?php previous_post_link() ?>
            </div>
            <div class="link">
                <?php next_post_link() . the_category() ?>
            </div>
        <?php endwhile; ?>
    <?php endif; ?>

    
    <?php get_footer(); ?>