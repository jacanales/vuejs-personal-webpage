<template>
    <section class="skills hidden">
        <div class="hero-body">
            <h2 class="subtitle is-1">
                Skills
            </h2>
            <nav class="tabs centered">
                <div class="columns is-variable is-mobile is-multiline social-list">
                    <div class="column">
                        <figure class="image skill is-96x96">
                            <img class="is-rounded" src="images/skills/golang.png" title="golang">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image skill is-96x96">
                            <img class="is-rounded" src="images/skills/php7.png" title="php7">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image skill is-96x96">
                            <img class="is-rounded" src="images/skills/aws.png" title="aws">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image skill is-96x96">
                            <img class="is-rounded" src="images/skills/mysql.png" title="mysql">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image skill is-96x96">
                            <img class="is-rounded" src="images/skills/docker.png" title="docker">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image skill is-96x96">
                            <img class="is-rounded" src="images/skills/kubernetes.png" title="kubernetes">
                        </figure>
                    </div>
                </div>
            </nav>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'owned_skills'
    };
</script>

<style lang="scss">
    h2.subtitle {
        text-align: center;
    }

    figure.skill {
        margin: 10px;
        img {
            height: 100%;
            box-shadow:0 0 10px 1px #000;
            -moz-box-shadow:0 0 10px 1px #000;
            -webkit-box-shadow:0 0 10px 1px #000;
        }
    }

    section.hidden {
        display: none;
    }

    .columns.is-variable {
      --columnGap: 0;
    }
</style>