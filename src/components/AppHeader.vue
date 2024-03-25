<script>
export default {
    name: 'AppHeader',
}
</script>

<template>
    <header>

        <div class="container">
            <div class="logo">
                <h1>BOOLFLIX</h1>
            </div>



        </div>

    </header>
</template>


<style scoped>
header {
    background-color: var(--bf-dark);
    color: var(--bf-danger);
    padding: 1rem;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>